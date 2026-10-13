const params = new URLSearchParams(window.location.search);

const algo = params.get("algo");

const title = document.getElementById("title");

const startButton = document.getElementById("startButton");

title.innerText = algo.toUpperCase() + " Sort";

const code = document.getElementById("codeContainer");
if (algo == "bubble") {
    code.innerHTML =
        `<pre>
Algorithm BubbleSort(A, n)

for i ← 0 to n - 2 do
    for j ← 0 to n - i - 2 do
        if A[j] > A[j + 1] then
            swap A[j] and A[j + 1]
        end if
    end for
end for

Output: Sorted array A
</pre>`
    startButton.onclick = bubbleSort;

}

else if (algo == "selection") {
    code.innerHTML = `SELECTION_SORT(A, n)
<pre>
for i ← 0 to n - 2 do
    minIndex ← i

    for j ← i + 1 to n - 1 do
        if A[j] < A[minIndex] then
            minIndex ← j
        end if
    end for

    if minIndex ≠ i then
        swap(A[i], A[minIndex])
    end if
end for
</pre>`
    startButton.onclick = selectionSort;

}

else if (algo == "insertion") {
    code.innerHTML= `INSERTION_SORT(A, n)
<pre>
for i ← 1 to n - 1 do
    key ← A[i]
    j ← i - 1

    while j ≥ 0 and A[j] > key do
        A[j + 1] ← A[j]
        j ← j - 1
    end while

    A[j + 1] ← key
end for
</pre>`
    startButton.onclick = insertionSort;

}

else if (algo == "merge") {

    startButton.onclick = startMergeSort;

}

else if (algo == "quick") {
    code.innerHTML = `<pre> 
    QUICK_SORT(A, low, high)

if low < high then

    pivotIndex ← PARTITION(A, low, high) 

    QUICK_SORT(A, low, pivotIndex - 1)

    QUICK_SORT(A, pivotIndex + 1, high)

end if


PARTITION(A, low, high)

    pivot ← A[high]

    i ← low - 1

    for j ← low to high - 1 do

        if A[j] ≤ pivot then

            i ← i + 1

            swap(A[i], A[j])

        end if

    end for

    swap(A[i + 1], A[high])
    
    return i + 1
</pre>`
    startButton.onclick = startQuickSort;

}