//
//  main.cpp
//  BInary Search Tree
//
//  Created by Saurabh Singh on 26/01/16.
//  Copyright © 2016 Saurabh Singh. All rights reserved.
//

#include <iostream>

struct node{
    int data;
    struct node *left;
    struct node *right;
};

void insert(struct node **node, int x)
{
    if(node == NULL)
    {
        (*node) = new struct node;
        (*node)->data = x;
        (*node)->left = NULL;
        (*node)->right = NULL;
    }
    else if(x < (*node)->data)
        insert(&(*node)->left, x);
    else if(x > (*node)->data)
        insert(&(*node)->right, x);
    
}



int main() {
    // insert code here...
    std::cout << "Hello, World!\n";
    int x;
    struct node *root = NULL;
    while(x != 9)
    {
        std::cout<<"1. Add value to BST 9. Exit";
        std::cin>>x;
        
        if(x == 1)
        {
            int y = 0;
            std::cout<<"Enter value to insert: ";
            std::cin>>y;
            insert(&root, y);
        }
    }
    return 0;
}
