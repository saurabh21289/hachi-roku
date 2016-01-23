//
//  main.cpp
//  Sorting
//
//  Created by Saurabh Singh on 30/12/15.
//  Copyright © 2015 Saurabh Singh. All rights reserved.
//

#include <iostream>
#include <vector>

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

//merge sort function

void printvector(vector<int> v)
{
    for (auto x: v){
        cout << x << " ";
    }
    cout << endl;
}

void merge(vector<int> &A,int p,int q,int r){
    
    int n1=q-p+1;
    int n2=r-q;
    int i,j;
    
    vector<int> L(n1+1);
    vector<int> R(n2+1);
    for (i=0;i<n1;i++)
        L[i]=A[p+i-1];
    for (j=0;j<n2;j++)
        R[i]=A[q+j];
    
    L[n1]=999;
    R[n2]=999;
    i=j=0;
    for (int k = p; k<r ; k++){
        if (L[i]<R[j]){
            A[k] = L[i];
            i++;
        }
        else {
            A[k]=R[j];
            j++;
        }
    }
}

void mergesort(vector<int> & A,int p,int r){
    
    int q;
    if (p<r){
        q=(p+r)/2;
        mergesort(A,p,q);
        mergesort(A,q+1,r);
        merge(A,p,q,r);
    }
}


int main() {
    // insert code here...
    int x;
    std::cout << "Hello, World!\n";
    std::cout << "Enter 1 for Quick sort; 2 for Merge sort";
    std::cin >> x;
//    std::cout << endl;
    
    if (x == 1){
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
    }
    
    else if(x == 2){
        int N=10;
        vector<int> v(N);
        
        // Read in the numbers
        cout << "sort these numbers" << endl;
        for (int i=0 ; i < N ; i++ )
        {
            v[i]=10 - i;
        }
        
        printvector(v);
        
        mergesort(v,0,N);
        
        cout << "the sorted numbers are" << endl;
        printvector(v);
        
        return 0;
    }
    
//    return 0;
}

