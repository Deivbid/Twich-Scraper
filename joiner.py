#!/usr/bin/env python3

import pandas as pd
import glob

fulldir = glob.glob('./TwitchUsers/Total.json')
#csvs = [ x for x in fulldir if x.endswith('.csv') ]
dfs  = [ pd.read_csv(csv, dtype=str, error_bad_lines=False) for csv in fulldir ]

result = pd.concat(dfs)

result.to_csv('TOTAL.csv', index=None)
