#!/usr/bin/python
# -*- coding: utf-8 -*-

#using sqlite version 3
import sqlite3 as lite
import sys

#connect with the firefox cookie database
con = lite.connect('/home/saurabh/.mozilla/firefox/pp0qyr8g.default/cookies.sqlite')

#fetch data from the cookie database
with con:    
    
    cur = con.cursor()
    #cur.execute(".mode columns")
    #cur.execute(".headers on")    
    cur.execute("SELECT * FROM moz_cookies")

    rows = cur.fetchall()

    for row in rows:
        print row
