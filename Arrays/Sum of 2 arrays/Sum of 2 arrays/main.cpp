//
//  main.cpp
//  Sum of 2 arrays
//
//  Created by Saurabh Singh on 06/02/16.
//  Copyright © 2016 Saurabh Singh. All rights reserved.
//

#include <iostream>
#include<math.h>

using namespace std;

int main() {

    int a[3], b[3], c[4], carry = 0, x;
    cout << "Enter the arrays: ";
    for (int i = 0; i < 3; i++)
        cin >> a[i];
    for (int i = 0; i < 3; i++)
        cin >> b[i];
    
    for (int i = 2; i >= 0; i--)
    {
        x = i - 1;
        c[i+1] = a[i] + b[i] + carry;
        
        if ( c[i+1] >= 10 && x >= -1 )
        {
            c[i+1] = c[i+1] - 10;
            carry = 1;
        }
        else{
            carry = 0;
        }
    }
    if (carry == 1)
         x = 0;
    else x = 1;
    for ( int i = x ; i<4; i++)
    {
        if (carry == 1)
            c[0] = 1;
        cout << c[i] << " ";
    }
    
    
}
