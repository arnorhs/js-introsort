/*
 * Intro sort ported from Java to Javascript
 *
 * original Copyright Ralph Unden,
 * http://ralphunden.net/content/tutorials/a-guide-to-introsort/?q=a-guide-to-introsort
 * Modifications: Bernhard Pfahringer
 *   changes include: local insertion sort, no global array
 *
 * Javascript port: Arnor Heidar Sigurdsson <arnorhs@gmail.com>
 */

module.exports = sort;

const size_threshold = 16;

const sort = (a) => {
    // you could modify it to accept a range if you want to split it up into
    // multiple parts
    introsort_loop(a, 0, a.length, 2 * floor_lg(a.length));
}

/*
* Quicksort algorithm modified for Introsort
*/
const introsort_loop = (a, lo, hi, depth_limit) => {
    while (hi-lo > size_threshold) {
        if (depth_limit === 0) {
            heapsort(a, lo, hi);
            return;
        }
        depth_limit=depth_limit-1;
        const p = partition(a, lo, hi, medianof3(a, lo, lo+((hi-lo)/2)+1, hi-1));
        introsort_loop(a, p, hi, depth_limit);
        hi = p;
    }
    insertionsort(a, lo, hi);
}

const  partition = (a, lo, hi, x) => {
    let i=lo, j=hi;
    while (true) {
        while (a[i] < x) i++;
        j=j-1;
        while (x < a[j]) j=j-1;
        if (i >= j) return i;
        exchange(a,i,j);
        i++;
    }
}

const medianof3 = (a, lo, mid, hi) => {
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
const heapsort = (a, lo, hi) => {
    const n = hi-lo, i;
    for (i= n / 2; i >= 1; i--) {
        downheap(a,i,n,lo);
    }
    for (i = n; i > 1; i--) {
        exchange(a,lo,lo+i-1);
        downheap(a,1,i-1,lo);
    }
}

const downheap = (a, i, n, lo) => {
    const d = a[lo+i-1];
    let child;
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
const insertionsort = (a, lo, hi) => {
    let i,j;
    let t;
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
const exchange = (a, i, j) => {
    const t=a[i];
    a[i]=a[j];
    a[j]=t;
}

const floor_lg = (a) => {
    return (Math.floor(Math.log(a)/Math.log(2))) << 0;
}

