//
//  main.cpp
//  Majority element in sorted array
//
//  Created by Saurabh Singh on 06/02/16.
//  Copyright © 2016 Saurabh Singh. All rights reserved.
//

#include <iostream>
#include <math.h>

using namespace std;

int main(int argc, const char * argv[]) {

    int n = 6;
    int a[n];
    cout << "Enter sorted array: ";
    for(int i=0; i<n; i++)
    {
        cin >> a[i];
    }
    
    int x = ceil(n/2);
    cout << "The element which repeats > ceil (n/2) times = "<< a[x] <<endl;
    
    
}
