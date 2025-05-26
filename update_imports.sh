#!/bin/bash

echo "Finding files that import useApi or useAuth..."
FILES=$(grep -r -l "import.*useApi\|import.*useAuth" --include="*.tsx" --include="*.jsx" src/)

for file in $FILES; do
  echo "Updating $file..."
  # Create a backup
  cp "$file" "${file}.bak"
  
  # Replace useApi import
  sed -i 's|import { useApi } from.*|import { useApi } from "../mocks/globalMocks";|g' "$file"
  sed -i 's|import {useApi} from.*|import { useApi } from "../mocks/globalMocks";|g' "$file"
  
  # Replace useAuth import
  sed -i 's|import { useAuth } from.*|import { useAuth } from "../mocks/globalMocks";|g' "$file"
  sed -i 's|import {useAuth} from.*|import { useAuth } from "../mocks/globalMocks";|g' "$file"
  
  # Handle cases where both are imported
  sed -i 's|import { useAuth, useApi } from.*|import { useAuth, useApi } from "../mocks/globalMocks";|g' "$file"
  sed -i 's|import {useAuth, useApi} from.*|import { useAuth, useApi } from "../mocks/globalMocks";|g' "$file"
  
  # Adjust relative paths based on file depth
  depth=$(echo "$file" | tr -cd '/' | wc -c)
  rel_path=""
  for ((i=1; i<depth; i++)); do
    rel_path="../$rel_path"
  done
  
  sed -i "s|\"../mocks/globalMocks\"|\"${rel_path}mocks/globalMocks\"|g" "$file"
done

echo "All imports updated!"
