import random

class Node:
    def __init__(self, parent=None, left=None, right=None, key=None):
        self.parent=parent
        self.left=left
        self.right=right
        self.key=key
    def __str__(self):
        return str(self.key)

class Tree():
    def __init__(self):
        self.root=None
    def insert(self,z):

        if not self.root: #tree is empty
            self.root=z
            z.parent=None
            return

        x=self.root
        while x: # x != NIL
            y=x
            if z.key < x.key:
                x = x.left
            else:
                x = x.right
        z.parent=y
        if z.key < y.key:
            y.left=z
        else:
            y.right=z


def inorder(x):
    if x:
        inorderwalk(x.left)
        print(x.key)
        inorderwalk(x.right)

    def __str__(self):
        n=Node(key=7)

new_tree=Tree()
L=['a','b','c','d','e','f']
random.shuffle(L)

for item in L:
    n=Node(key=item)
    print(n)
    new_tree.insert(n)


def topdownwalk(x):
    if x:
        print('key:',x.key)
        if x.left:
            print('left:', x.left)
            topdownwalk(x.left)
        if x.right:
            print('right:', x.right)
            topdownwalk(x.rights)
        # topdownwalk(x.left)
        # topdownwalk(x.right)

    # return str(self.key)+"L:"+str(self.left)

print(new_tree)
