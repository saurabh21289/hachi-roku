# AUTHOR1: Kratesh kratesh@bu.edu
# AUTHOR2: Pranay pranayrs@bu.edu
# AUTHOR3: Saurabh ssingh02@bu.edu

nuts = [4,5,1,2,3]
bolts = [4,3,1,5,2]
sorted = [0]*len(nuts)

def test(x,y):
    if x == y:
        return 0 #nut fits perfectly
    if x > y:
        return 1 #nut is too big
    else:
        return -1 #nut if too small


def sort(nuts, bolts):
    for i in nuts:
        left = 0
        for j in bolts:
            if test(i,j) == 1:
                left += 1
        sorted[left] = i

sort(nuts,bolts)
print(sorted)
