def test(x,y):
    if x < y:
        print "nut is too small"
    elif x > y:
        print "nut is too big"
    elif x == y:
        print "nut fits perfectly"
        return 0



nuts = [5,4,3,2,1]
bolts = [3,2,4,5,1]
bolts2 = [len(nuts)]
# x = 'a'

for i in range(len(nuts)):
    for j in range(len(nuts)):
        x = test(nuts[i],bolts[j])
        if x == 0:
            # tmp = nuts[j]
            bolts2[i] = nuts[j]
            # nuts[i] = tmp

print nuts
print bolts
print bolts2
