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

void binary_sum(string file1)
{
    int j=0, a[32], sum=0, k=0;
    string line;
    fstream myfile;
    myfile.open(file1);
    
    while (!myfile.eof())
    {
        getline(myfile, line);
        {
            for (int i = 0; line[i] != '\0'; i++)
            {
                a[i] = (int)line[i] - 48;
                j = i;
            }
            
            k = j;
            
            for (int i = 0; i <= k ; i++)
            {
                a[i] = a[i] * pow (2,j);
                j--;
                sum = sum + a[i];
            }
        }

    }
    cout << "The sum of the binary numbers = "<< sum << endl;
    myfile.close();
    
}


int main(int argc, const char *argv[]) {

    string file1 = argv[1];
    binary_sum(file1);
    return 0;
}
