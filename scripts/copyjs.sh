#!/bin/bash
cd src;
find . -name \*.js -exec cp {} --parents ../dist \;
cd ..;