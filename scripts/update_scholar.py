"""Fetch citation stats from Google Scholar and write to scholar-data.json."""

import json
import os
import sys

from scholarly import scholarly

SCHOLAR_ID = "G7DjT5kAAAAJ"
OUTPUT_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)), "scholar-data.json"
)


def main():
    try:
        author = scholarly.search_author_id(SCHOLAR_ID)
        author = scholarly.fill(author, sections=["basics", "indices", "publications"])

        citations = author.get("citedby", 0)
        publications = len(author.get("publications", []))
        h_index = author.get("hindex", 0)
        i10_index = author.get("i10index", 0)

        data = {
            "citations": citations,
            "publications": publications,
            "h_index": h_index,
            "i10_index": i10_index,
            "scholar_id": SCHOLAR_ID,
            "last_updated": None,  # Will be set by the workflow commit message
        }

        # Add timestamp
        from datetime import datetime, timezone

        data["last_updated"] = datetime.now(timezone.utc).isoformat()

        with open(OUTPUT_PATH, "w") as f:
            json.dump(data, f, indent=2)

        print(
            f"Updated scholar-data.json: {citations} citations, {publications} publications"
        )

    except Exception as e:
        print(f"Error fetching scholar data: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
