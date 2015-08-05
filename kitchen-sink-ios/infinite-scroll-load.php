<?php
// Start index of list element to repsonse with
$leftIndex = $_GET['leftIndex'];
$itemsAmount = 19; // 19 items per request
$maxItemIndex = 200; // 150th item will be the last

if ($leftIndex >= $maxItemIndex) {
    // nothing to load
    exit();
}

$rightIndex = $leftIndex + $itemsAmount;
if ($rightIndex > $maxItemIndex) $rightIndex = $maxItemIndex;

for ($i = $leftIndex; $i <= $rightIndex; $i++) {
    echo '<li class="item-content"><div class="item-inner"><div class="item-title">Item '.$i.'</div></div></li>';
}

?>