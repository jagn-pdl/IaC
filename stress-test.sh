#!/usr/bin/env bash
set -uo pipefail

DEFAULT_URL="http://main-alb-355676448.us-east-1.elb.amazonaws.com/"
URL_IN="${1:-$DEFAULT_URL}"
DURATION="${2:-900}"
WORKERS="${3:-50}"
BATCH="${4:-50}"

URL="${URL_IN#http://}"
URL="${URL#https://}"
URL="http://${URL%/}/"

echo "Target: $URL"
CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$URL")
[ "$CODE" = "200" ] || { echo "ERROR: HTTP $CODE"; exit 1; }

probe() {
  for _ in $(seq 30); do
    curl -s --max-time 5 "$URL" | grep -oE 'instance: [0-9.]+'
  done | sort -u | wc -l | tr -d ' '
}

watch() {
  while :; do
    echo "[$(date +%T)] instances: $(probe)"
    sleep 20
  done
}

WORKDIR=$(mktemp -d)
START=$(date +%s)
END=$((START + DURATION))
DONE=0

finish() {
  [ "$DONE" = 1 ] && return
  DONE=1
  kill "$WATCH_PID" 2>/dev/null
  kill $(jobs -p) 2>/dev/null

  local elapsed=$(( $(date +%s) - START ))
  [ "$elapsed" -gt 0 ] || elapsed=1
  local total=$(( $(cat "$WORKDIR"/w* 2>/dev/null | wc -l) * BATCH ))

  echo "Done: $total requests (~$((total / elapsed))/s)"
  echo "Final instances: $(probe)"
  rm -rf "$WORKDIR"
}

trap finish EXIT INT TERM

URLS=""
for _ in $(seq "$BATCH"); do URLS+=" $URL"; done

worker() {
  local id=$1
  while [ "$(date +%s)" -lt "$END" ]; do
    curl -s --max-time 60 $URLS >/dev/null 2>&1
    echo x >> "$WORKDIR/w$id"
  done
}

watch &
WATCH_PID=$!

echo "Load: $WORKERS workers × $BATCH requests for ${DURATION}s"

for i in $(seq "$WORKERS"); do
  worker "$i" &
done

for job in $(jobs -p); do
  [ "$job" = "$WATCH_PID" ] || wait "$job" 2>/dev/null
done