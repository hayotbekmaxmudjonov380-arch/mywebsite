#!/bin/bash

echo "=== ITSHOPPING Performance Test ==="
echo ""

BASE_URL="${1:-http://localhost:3000}"
ITERATIONS=10

echo "Testing: $BASE_URL"
echo "Iterations: $ITERATIONS"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Test function
test_endpoint() {
  local url=$1
  local name=$2
  
  echo -n "Testing $name... "
  
  total_time=0
  success_count=0
  
  for i in $(seq 1 $ITERATIONS); do
    response=$(curl -s -o /dev/null -w "%{time_total}" "$url" 2>/dev/null)
    
    if [ $? -eq 0 ]; then
      total_time=$(echo "$total_time + $response" | bc)
      success_count=$((success_count + 1))
    fi
  done
  
  if [ $success_count -gt 0 ]; then
    avg_time=$(echo "scale=3; $total_time / $success_count" | bc)
    echo -e "${GREEN}OK${NC} - Avg: ${avg_time}s (${success_count}/${ITERATIONS} success)"
  else
    echo -e "${RED}FAILED${NC}"
  fi
}

# Health check
echo "1. Health Check"
test_endpoint "$BASE_URL/api/health" "Health API"

echo ""
echo "2. Static Pages"
test_endpoint "$BASE_URL" "Homepage"
test_endpoint "$BASE_URL/blog" "Blog"
test_endpoint "$BASE_URL/faq" "FAQ"
test_endpoint "$BASE_URL/contact" "Contact"

echo ""
echo "3. API Endpoints"
test_endpoint "$BASE_URL/api/products" "Products API"
test_endpoint "$BASE_URL/api/faq" "FAQ API"
test_endpoint "$BASE_URL/api/blog" "Blog API"

echo ""
echo "=== Performance Test Complete ==="
