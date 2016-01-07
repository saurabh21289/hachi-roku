//
//  main.cpp
//  Sorting
//
//  Created by Saurabh Singh on 30/12/15.
//  Copyright © 2015 Saurabh Singh. All rights reserved.
//

#include <iostream>

//void display(int* , int);

void display(int *arr, int size)
{
    for(int i=0; i<size; i++)
        std::cout << arr[i] << " ";
    std::cout << std::endl;
}

void quick_sort(int *arr, int left, int right)
{
    int i = left;
    int j = right;
    int tmp;
    
    int pivot = (left + right)/2;
    while (i <= j){
        while (arr[i] < arr[pivot])
            i++;
        while (arr[j] > arr[pivot])
            j--;
        if(i <= j){
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
    }
    if (left < j)
        quick_sort(arr, left, j);
    if (i < right)
        quick_sort(arr, i, right);
    
}

int main() {
    // insert code here...
    std::cout << "Hello, World!\n";
    int size = 6;
    int arr[size];
    int left = size - size;
    int right = size-1;
    
    for(int i=0; i<size; i++)
        arr[i] = rand() % size;
    
    display(arr, size);
    quick_sort(arr , left, right);
    std::cout << "Sorted array: " << std::endl << 9/2 << std::endl;
    display(arr, size);
    
//    return 0;
}

