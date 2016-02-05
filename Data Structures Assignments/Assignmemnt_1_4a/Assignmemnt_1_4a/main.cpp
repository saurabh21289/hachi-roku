//
//  main.cpp
//  Assignmemnt_1_4a
//
//  Created by Saurabh Singh on 31/01/16.
//  Copyright © 2016 Saurabh Singh. All rights reserved.
//

#include <iostream>
#include <fstream>
#include <stdio.h>
#include <string>
#include <math.h>

using namespace std;

int binary_to_decimal(int a[], int &b, int j)
{
    int k = j;
    for (int i = 0; i < k; i++)
    {
        a[i] = a[i] * pow (2,j-1);
        j--;
        b = b + a[i];
    }
    
    return b;
    
}


int main(int argc, const char * argv[]) {
    int a[9], b = 0;
    string line;
    int j = 0, sum = 0;
    
    fstream myfile;
    myfile.open(argv[1]);
    
    while (!myfile.eof())
    {
        getline(myfile, line);
        {
            for (int i = 0; line[i] != '\0'; i++)
            {
                a[i] = (int)line[i] - 48;
                j = i;
            }
            sum = binary_to_decimal(a, b, j+1);
        }
    }
    
    cout << "The sum of the binary numbers = "<< sum << endl;
    
    myfile.close();
    return 0;
}
