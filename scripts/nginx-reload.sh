#!/bin/sh
# Reload Nginx configuration after certificate renewal
docker exec proxy nginx -s reload
