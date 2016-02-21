//
//  main.cpp
//  Sorting
//
//  Created by Saurabh Singh on 30/12/15.
//  Copyright © 2015 Saurabh Singh. All rights reserved.
//

#include <iostream>
#include <vector>
#include <stdlib.h>

using namespace std;

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
    
    //int pivot = (left + right)/2;
    int pivot = right;
    while (i <= j){
        while (arr[i] < arr[pivot])
            i++;
        while (arr[pivot] < arr[j])
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

//merge sort function

void printvector(vector<int> v)
{
    for (auto x: v){
        cout << x << " ";
    }
    cout << endl;
}

void merge(int a[],int beg,int mid,int end){

    int l1 = mid - beg + 1;
    int l2 = end - mid;
    int L[l1 + 1], R[l2 + 1];
    
    for(int i=1; i<=l1; i++)
        L[i] = a[beg + i -1];
    
    for(int j=1; j<=l2; j++)
        R[j] = a[mid + j];
    
    L[l1+1] = 999;
    R[l2+1] = 999;
    
    int i = 0, j = 0;
    
    for(int k=beg; k<=end; k++)
    {
            if(L[i] <= R[j])
            {
                a[k] = L[i];
                i++;

            }
            else{
                a[k] = R[j];
                j++;
            }
    }
   
}



void mergesort(int a[],int beg,int end){
    
    int mid;
    if (beg<end){
        mid=(beg+end)/2;
        mergesort(a,beg,mid);
        mergesort(a,mid+1,end);
        merge(a,beg,mid,end);
    }
}


int main() {
    // insert code here...
    int x;
    std::cout << "Hello, World!\n";
    std::cout << "Enter 1 for Quick sort; 2 for Merge sort: ";
    std::cin >> x;
//    std::cout << endl;
    
    if (x == 1){
    int size = 10;
    int arr[size];
    int left = size - size;
    int right = size-1;
    
    for(int i=0; i<size; i++)
        arr[i] = rand() % size;
    
    display(arr, size);
    quick_sort(arr , left, right);
    std::cout << "Sorted array: " << std::endl;
    display(arr, size);
    }
    
    else if(x == 2){
        int N=10;
        int v[N];
        
        // Read in the numbers
        cout << "sort these numbers" << endl;
        for (int i=0 ; i < N ; i++ )
        {
            v[i]= 45 - 5*i;
        }
        
        display(v, N);
        
        mergesort(v,1,N);
        
        cout << "the sorted numbers are" << endl;
        display(v,N);
        
        return 0;
    }
    
//    return 0;
}

