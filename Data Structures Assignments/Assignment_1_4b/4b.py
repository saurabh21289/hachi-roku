

import sys
str = sys.argv[1]
n = sys.argv[2]
n = int(n)

def Analyze(str, size):
    num = size
    length = len(str)

    pair = (length-num+1)

    count =[0]*pair

    if(num < length):
        for i in range(pair):
            sub_str = str[i:i+num]
            for j in range(i+1,pair):
                sub_str2 = str[j:j+num]
                if sub_str in sub_str2:
                    #print sub_str + " " + sub_str2 + "true"
                    count[i] += 1

        i = max(count)
        val = count.index(i)
        print(str[val:val+num])

    else:
        print str

Analyze(str,n)