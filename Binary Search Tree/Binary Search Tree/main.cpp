//
//  main.cpp
//  BInary Search Tree
//
//  Created by Saurabh Singh on 26/01/16.
//  Copyright © 2016 Saurabh Singh. All rights reserved.
//

#include <iostream>

using namespace std;

struct node{
    int data;
    struct node *left;
    struct node *right;
};

void insert(struct node **node, int x)
{
    if(*node == NULL)
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

int size(struct node *node)
{
    if(node != NULL)
    {
        return (size(node->left) + 1 + size(node->right));
    }
    else
    {
        return 0;
    }
}

void inorder(struct node *node) //Always displys in ascending order
{
    if(node != NULL)
    {
        inorder(node->left);
        std::cout<<node->data<<" ";
        inorder(node->right);
    }

}

int search(struct node *node, int z)
{
    if (node == NULL){
        return 0;
    }
    else if (node->data == z)
    {
        std::cout<<"Element found is "<<node->data<<std::endl;
        return 1;
    }
    else if(node->data > z)
        return search(node->left, z);
    else
        return search(node->right, z);
    
}

void delete_tree(struct node **node)
{
        if ( (*node) == NULL)
            return;
    
        delete_tree(&(*node)->left);
        delete_tree(&(*node)->right);
    
        if((*node)->left == NULL && (*node)->right==NULL)
        {
            free(*node);
            *node = NULL;
        }
}

int main() {
    // insert code here...
    std::cout << "Hello, World!\n";
    int x, z;
    struct node *root = NULL;
    while(x != 9)
    {
        cout<<std::endl<<"1.Add value to BST 2.Count nodes 3.Inorder traversal 4.Search element 5.Delete tree 9.Exit : ";
        std::cin>>x;
        
        if(x == 1)
        {
            int y = 0;
            std::cout<<"Enter value to insert: ";
            std::cin>>y;
            insert(&root, y);
        }
        else if(x == 2)
        {
            z = size(root);
            std::cout<<"Size of BST = "<< z <<std::endl;
        }
        else if(x == 3)
        {
            inorder(root);
        }
        else if( x == 4)
        {
            std::cout<<"Enter the element to search: ";
            std::cin>>z;
            x = search(root, z);
            if ( x == 1)
                std::cout<<"Element found!"<<std::endl;
            else
                std::cout<<"Element not found."<<std::endl;
        }
        else if(x == 5)
        {
            delete_tree(&root);
        }
    }
    return 0;
}
