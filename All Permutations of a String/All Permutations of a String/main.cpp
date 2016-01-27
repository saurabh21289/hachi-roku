//
//  main.cpp
//  All Permutations of a String
//
//  Created by Saurabh Singh on 27/01/16.
//  Copyright © 2016 Saurabh Singh. All rights reserved.
//

#include <iostream>

void perm(char a[], int k, int n)
{
    int temp;
    if (k == n)
    {
        for(int i=0; i<n; i++)
            std::cout<<a[i];
        std::cout<<std::endl;
    }
    else
    {
        for(int i=k; i<n; i++)
        {
            temp = a[k];
            a[k] = a[i];
            a[i] = temp;
            
            //This step goes onto to recursively print & then swap
            perm(a, k+1, n);
            
            temp = a[k];
            a[k] = a[i];
            a[i] = temp;
        }
    }
}

int main(int argc, const char * argv[]) {
    // insert code here...
    std::cout << "Hello, World!\n";
    int x; int n = 10; //More n means more levels of recursion will occur
    char a[n];
//    std::cin>>x;
    while(x != 9)
    {
//        std::cout<<"Enter the characters";
        for(int i=0; i<n; i++)
        {
            std::cout<<"Enter character "<< i <<": ";
            std::cin>>a[i];
        }
        perm(a,0,n);
    }
    return 0;
}
