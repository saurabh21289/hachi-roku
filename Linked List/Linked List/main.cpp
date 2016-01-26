//
//  main.cpp
//  Linked List
//
//  Created by Saurabh Singh on 22/01/16.
//  Copyright © 2016 Saurabh Singh. All rights reserved.
//

#include <iostream>

struct node{
    
    int data;
    struct node *next;
};

struct node* insert(struct node *head, struct node *&tail, int y){
    struct node *temp;
    temp = (struct node*)malloc(sizeof(struct node));
    temp->data = y;

    if (head == NULL)
    {
        head = temp;
        tail = temp;
        temp->next = NULL;
    }
    else {
        
        temp->next = head;
        head = temp;
//        temp->next = NULL;
        
    }
//    std::cout<<"head = "<<head<<" temp->next ="<<temp->next;
    return(head);
//    return;
}

void traverse(struct node *head){
    struct node *temp;
//    temp = (struct node*)malloc(sizeof(struct node));
    temp = head;
    if(head == NULL){
//        temp = head;
        std::cout<<"Linked List Empty"<<std::endl;
    }
    else
    {
        while(temp != NULL){
        std::cout<<temp->data<<std::endl;
        temp = temp->next;
        }
    }
}

struct node* del_node(struct node *head, int y){
    
    struct node *temp;
    temp = head;
    
    if(head->data == y)
    {
//        struct node *temp = head;
        head = head->next;
        free (temp);
    }
    else{
        
//        struct node *temp = head;
        while(temp->next->data != y)
            temp = temp->next;
        
            struct node *temp2 = temp->next;
            temp->next = temp2->next;
            free(temp2);
            
        
        
    }
    return(head);
    
    
}

struct node* del_node2(struct node *head, int x)
{
    struct node *temp;
    temp = (struct node*)malloc(sizeof(struct node));
    
    if(head == NULL)
        std::cout<<"List is empty!";
    else if(head->data == x)
    {
        temp = head;
        head = head->next;
        free(temp);
    }
    
    else
    {
        temp = head;
        while(temp->next->data != x)
            temp = temp->next;
        
        struct node *temp2 = temp->next;
        temp->next = temp2->next;
        free(temp2);
    }
    return (head);
    
}

int main() {
    // insert code here...
    std::cout << "Hello, World!\n";
    int x=0, y=0;
    struct node *head = NULL;
    struct node *tail = NULL;
    
    while(x !=9){
        
    std::cout << "1: Add value in the beginning | 2: Traverse  | 3: Delete node | 9: Exit : ";
    std::cin >> x;
    
        if(x == 1)
        {
            std::cout << "Enter value to insert: ";
            std::cin >> y;
            head = insert(head, *&tail, y);
        
        }
        
        if(x == 2)
        {
            traverse(head);
        }
        
        if (x == 3)
        {
            std::cout<<"Enter value to delete: ";
            std::cin>> y;
            std::cout<<"Head before deletion = "<<head<<std::endl;;
            head = del_node2(head, y);
        }
        
//    start = (struct node*)malloc(sizeof(struct node));
//    start->data = 5;
//    start->next = (struct node*)malloc(sizeof(struct node));
//    start->next->data = 10;
//    std::cout<< (start->data)<<std::endl<< start->next->data;
    }
    
    return 0;
}
