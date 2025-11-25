#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Normalize product descriptions and remove legacy warranty fields.

This script keeps all data local (no remote calls) and rewrites
`public/data/products.json` with:
- Short, concise descriptions (<=16 words)
- Longer marketing blurbs (<=32 words)
- No `warranty` field in specifications for non-bike items

It is idempotent and safe to rerun during development.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List

DATA_PATH = Path(__file__).resolve().parents[1] / "public" / "data" / "products.json"


def clean_text(text: str) -> str:
    """Collapse whitespace and strip control characters."""
    return " ".join(text.replace("\r", " ").replace("\n", " ").split())


def trim_words(text: str, limit: int) -> str:
    """Trim a sentence to a maximum number of words."""
    words = text.split()
    if len(words) <= limit:
        return text
    return " ".join(words[:limit])


def build_short_description(name: str, spec_text: str) -> str:
    base = f"{name} {spec_text}".strip()
    if spec_text:
        candidate = f"{base} لصيانة الدراجات النارية"
    else:
        candidate = f"{name} لاحتياجات دراجتك النارية"
    return trim_words(candidate, 16)


def build_long_description(name: str, spec_text: str) -> str:
    parts: List[str] = [name]
    if spec_text:
        parts.append(f"بمواصفة {spec_text}")
    parts.append("يوفر أداءً ثابتاً ويحافظ على المحرك مع الاستخدام اليومي والصيانة الدورية.")
    candidate = " ".join(parts)
    return trim_words(candidate, 32)


def normalize_products(products: List[Dict]) -> List[Dict]:
    for product in products:
        specs: Dict = product.get("specifications") or {}

        # Remove warranty for non-bikes (safety cleanup)
        if product.get("type") != "bike" and "warranty" in specs:
            specs.pop("warranty", None)

        spec_text = clean_text(str(specs.get("specification", ""))) if specs else ""
        name = clean_text(str(product.get("name", "")))

        product["short_description"] = build_short_description(name, spec_text)
        product["description"] = build_long_description(name, spec_text)
        product["specifications"] = specs
    return products


def main() -> None:
    if not DATA_PATH.exists():
        raise SystemExit(f"Data file not found: {DATA_PATH}")

    products = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    updated = normalize_products(products)
    DATA_PATH.write_text(json.dumps(updated, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Updated {len(updated)} products at {DATA_PATH}")


if __name__ == "__main__":
    main()
