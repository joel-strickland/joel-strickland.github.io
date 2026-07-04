"""Fetch citation stats from Google Scholar and update all site references."""

import json
import os
import re
import sys
import time
from datetime import datetime, timezone

from scholarly import ProxyGenerator, scholarly

SCHOLAR_ID = "G7DjT5kAAAAJ"
ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
OUTPUT_PATH = os.path.join(ROOT_DIR, "scholar-data.json")

# PhD started September 2016
PHD_START = datetime(2016, 9, 1, tzinfo=timezone.utc)


def calculate_years():
    now = datetime.now(timezone.utc)
    years = (now - PHD_START).days / 365.25
    return round(years, 1)


def update_file(filepath, replacements):
    """Apply regex replacements to a file."""
    path = os.path.join(ROOT_DIR, filepath)
    if not os.path.exists(path):
        print(f"  Skipping {filepath} (not found)")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    for pattern, replacement in replacements:
        content, count = re.subn(pattern, replacement, content)
        if count:
            print(f"  {filepath}: replaced {count}x ({pattern[:50]}...)")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def fetch_with_retry(max_retries=3):
    """Fetch scholar data with retries and timeouts."""
    for attempt in range(max_retries):
        try:
            if attempt > 0:
                time.sleep(10)
                # Set up proxy on retry
                pg = ProxyGenerator()
                success = pg.FreeProxies(timeout=15)
                if success:
                    scholarly.use_proxy(pg)

            scholarly.set_timeout(30)
            author = scholarly.search_author_id(SCHOLAR_ID)
            author = scholarly.fill(
                author, sections=["basics", "indices", "publications"]
            )
            return author
        except Exception as e:
            print(f"  Attempt {attempt + 1}/{max_retries} failed: {e}", file=sys.stderr)
            if attempt == max_retries - 1:
                raise
    return None


def main():
    try:
        author = fetch_with_retry()
        if author is None:
            print("Failed to fetch scholar data after retries", file=sys.stderr)
            sys.exit(1)

        citations = author.get("citedby", 0)
        publications = len(author.get("publications", []))
        h_index = author.get("hindex", 0)
        i10_index = author.get("i10index", 0)
        years = calculate_years()

        # Write JSON
        data = {
            "citations": citations,
            "publications": publications,
            "h_index": h_index,
            "i10_index": i10_index,
            "years_experience": years,
            "scholar_id": SCHOLAR_ID,
            "last_updated": datetime.now(timezone.utc).isoformat(),
        }

        with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        print(
            f"scholar-data.json: {citations} citations, {publications} publications, {years} years"
        )

        # Update hardcoded values across the site
        print("Updating hardcoded references...")

        # index.html - fallback data-target values and FAQ
        update_file(
            "index.html",
            [
                (
                    r'id="publications-counter" data-target="\d+" data-suffix="\+[^>]*>\d+\+',
                    f'id="publications-counter" data-target="{publications}" data-suffix="+" style="cursor: pointer;">{publications}+',
                ),
                (
                    r'id="citations-counter" data-target="\d+" data-suffix="\+[^>]*>\d+\+',
                    f'id="citations-counter" data-target="{citations}" data-suffix="+" style="cursor: pointer;">{citations}+',
                ),
                (
                    r"\d+\+ publications with \d+\+ citations",
                    f"{publications}+ publications with {citations}+ citations",
                ),
                (
                    r'id="about-years">[0-9.]+</span>',
                    f'id="about-years">{years}</span>',
                ),
                (
                    r'id="years-counter" data-target="[0-9.]+">[0-9.]+',
                    f'id="years-counter" data-target="{years}">{years}',
                ),
            ],
        )

        # cv.html - meta description, body text, years
        update_file(
            "cv.html",
            [
                (r"\d+\+ citations", f"{citations}+ citations"),
                (r"\d+\+ publications", f"{publications}+ publications"),
                (
                    r"<strong>Total Publications:</strong> \d+\+ papers",
                    f"<strong>Total Publications:</strong> {publications}+ papers",
                ),
                (r'id="cv-years">[0-9.]+</span>', f'id="cv-years">{years}</span>'),
            ],
        )

        # README.md
        update_file(
            "README.md",
            [
                (r"\*\*Citations:\*\* \d+\+", f"**Citations:** {citations}+"),
                (
                    r"\*\*Publications:\*\* \d+\+ articles on Google Scholar",
                    f"**Publications:** {publications}+ articles on Google Scholar",
                ),
                (
                    r"\*\*Experience:\*\* [0-9.]+ years",
                    f"**Experience:** {years} years",
                ),
            ],
        )

        print("Done.")

    except Exception as e:
        print(f"Error fetching scholar data: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
