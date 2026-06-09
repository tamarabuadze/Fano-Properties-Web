#!/bin/bash
cd /Users/Mac/Documents/Fano/apps/web
exec ./node_modules/.bin/next dev --port "${PORT:-3000}"
