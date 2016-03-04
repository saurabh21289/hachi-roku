
// AUTHOR1: Pranay pranayrs@bu.edu
// AUTHOR2: Saurabh ssingh02@bu.edu
// AUTHOR3: Kratesh kratesh@bu.edu

#include <iostream>
#include <stdlib.h>
#include <vector>
#include <ctype.h>
#include <algorithm>

using namespace std;

typedef std::vector<int> int_array;

int find_median(int *a, int *b,int n,int m);
int min(int n1,int n2);
int max(int n1,int n2);
float median_of_2(int a, int b);
int median_of_3(int a, int b,int c);
float median_of_4(int a, int b,int c,int d);
int main(){
    
    int_array a1,a2;
    int *a,*b,n,m;
    int temp = 0;
    cout<<"Enter the Array (use -1 to terminate array): ";
    while(temp != -1){
        cin>>temp;
        a1.push_back(temp);
    }
    a1.pop_back();
    
    temp =0;
    cout<<"Enter the Array (use -1 to terminate array): ";
    while(temp != -1){
        cin>>temp;
        a2.push_back(temp);
    }
    a2.pop_back();
    
    sort(a1.begin(),a1.end());
    sort(a2.begin(),a2.end());
    
    a = &a1[0];
    b = &a2[0];
    n = a1.size();
    m = a2.size();
    
    if(n < m){
        cout<<"\n\tMedian is: "<<find_median(a,b,n,m)<<"\n";
    }
    else{
        cout<<"\n\tMedian is: "<<find_median(b,a,m,n)<<"\n";
    }
    
    return 0;
}

int find_median(int *a, int *b,int n,int m){
    
    if(n == 1){
        if( m == 1){
            return median_of_2(a[0],b[0]);
        }
        else if( m % 2 != 0){					// or  if(m & 1)  this is also the same thing apparantely
            return median_of_2(b[m/2],median_of_3(b[m/2 - 1],b[m/2 + 1],a[0]));
        }
        else{
            return median_of_3(a[0],b[m/2],b[m/2 - 1]);
        }
        
    }
    else
        if(n == 2){
            if(m == 2){
                return median_of_4(a[0],a[1],b[1],b[0]);
            }
            else if(m % 2 != 0){
                return median_of_3(b[m/2],min(b[m/2 + 1],a[1]),max(a[0],b[m/2 - 1]));
            }
            else{
                return median_of_4(b[m/2],b[m/2 - 1], min(a[1],b[m/2 + 1]),max(a[0],b[m/2 - 2]));
            }
        }
    
    int mid_n = (n - 1)/2;
//  int mid_m = (m - 1)/2;
    
    if(a[n/2] < b[m/2]){
        return find_median(a + mid_n,	b,n/2 + 1, m - mid_n);
    }
    
    return find_median(a,b+mid_n,n/2+1,m - mid_n);
}

int max(int n1,int n2){
    return n1>n2?n1:n2;
}
int min(int n1,int n2){
    return n1<n2?n1:n2;
}

float median_of_2(int a, int b){
    return (a+b)/2.0;
}
int median_of_3(int a, int b,int c){
    return a + b + c - max(a,max(b,c)) - min(a,min(b,c));
}
float median_of_4(int a, int b,int c,int d){
    int Max = max(a,max(b,max(c,d)));
    int Min = min(a,min(b,min(c,d)));
    return (a + b + c + d - Max - Min)/2.0;
}