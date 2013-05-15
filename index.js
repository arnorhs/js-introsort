module.exports = sort;

var size_threshold = 16;

function sort(a) {
    // you could modify it to accept a range if you want to split it up into
    // multiple parts
    introsort_loop(a, 0, a.length, 2 * floor_lg(a.length));
}

/*
* Quicksort algorithm modified for Introsort
*/
function introsort_loop (a, lo, hi, depth_limit) {
    while (hi-lo > size_threshold) {
        if (depth_limit == 0) {
            heapsort(a, lo, hi);
            return;
        }
        depth_limit=depth_limit-1;
        var p = partition(a, lo, hi, medianof3(a, lo, lo+((hi-lo)/2)+1, hi-1));
        introsort_loop(a, p, hi, depth_limit);
        hi = p;
    }
    insertionsort(a, lo, hi);
}

function partition(a, lo, hi, x) {
    var i=lo, j=hi;
    while (true) {
        while (a[i] < x) i++;
        j=j-1;
        while (x < a[j]) j=j-1;
        if(!(i < j)) return i;
        exchange(a,i,j);
        i++;
    }
}

function medianof3(a, lo, mid, hi) {
    if (a[mid] < a[lo]) {
        if (a[hi] < a[mid]) {
            return a[mid];
        } else {
            return (a[hi] < a[lo]) ? a[hi] : a[lo];
        }
    } else {
        if (a[hi] < a[mid]) {
            return (a[hi] < a[lo]) ? a[lo] : a[hi];
        } else {
            return a[mid];
        }
    }
}

/*
* Heapsort algorithm
*/
function heapsort(a, lo, hi) {
    var n = hi-lo;
    for (var i=n/2; i>=1; i=i-1) {
        downheap(a,i,n,lo);
    }
    for (var i=n; i>1; i=i-1) {
        exchange(a,lo,lo+i-1);
        downheap(a,1,i-1,lo);
    }
}

function downheap(a, i, n, lo) {
    var d = a[lo+i-1];
    var child;
    while (i<=n/2) {
        child = 2*i;
        if (child < n && a[lo+child-1] < a[lo+child]) {
            child++;
        }
        if (d >= a[lo+child-1]) break;
        a[lo+i-1] = a[lo+child-1];
        i = child;
    }
    a[lo+i-1] = d;
}

/*
* Insertion sort algorithm
*/
function insertionsort(a, lo, hi) {
    var i,j;
    var t;
    for (i=lo; i < hi; i++) {
        j=i;
        t = a[i];
        while(j!=lo && t < a[j-1]) {
            a[j] = a[j-1];
            j--;
        }
        a[j] = t;
    }
}

/*
* Common methods for all algorithms
*/
function exchange(a, i, j) {
    var t=a[i];
    a[i]=a[j];
    a[j]=t;
}

function floor_lg(a) {
    return (Math.floor(Math.log(a)/Math.log(2))) << 0;
}

