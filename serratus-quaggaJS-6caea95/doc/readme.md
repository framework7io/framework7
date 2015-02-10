Barcode Reader
==============

Barcode Reader is a library written in JavaScript capable of decoding common barcodes (e.g.: Code128 and EAN13) directly in the browser. It can handle various sources of images such as file-input for a single image or preferrably a camera stream (via `getUserMedia`) for real-time decoding.

# How does it work?
For those of you interested in the inner workings of this implementation, please keep on reading.

As already depicted in the image above, this implementation makes use of two subsequent stages, first locating (blue box) and second decoding (red line) the barcode. 

## Barcode Locator
The main purpose of the barcode locator is finding a pattern within the source image which looks like a barcode. A barcode is typically characterized by its black bars and white gaps in between. The overall size of the barcode may depend on the amount of information encoded (Code128) or be fixed in width (EAN13). When searching for a barcode in an image we are looking for:

- _lines_, which are
- _close_ _to_ each other
- have a similar _angle_

The process of locating such a barcode is loosely based on a paper called [Locating and decoding EAN-13 barcodes from images captured by digital cameras][douglas_05] which's steps were adapted and modified resulting in:

1. Creating a binary representation of the image
2. Slice the image into a grid (20 x 15 cells)
3. Extract the skeleton of each cell
4. Separate the skeleton into its parts
5. Component labeling
6. Calculate the rotation of each part
7. Determine cell quality (rotation uniformity)
8. Find connecting cells with similar rotation
9. Create bounding-box of connected cells

Let's start with the creation of a binary image, or more precisely, a thresholded image.

### Creating a binary image
There are many different ways of creating a binary representation of an image. The easiest being a global threshold of 127 and determining for each pixel if its brighter (>=127) or darker(<127) than the threshold. Whilst this method might be the simpliest to implement, the outcome might not be sufficient because it does not take into account illumination changes across the image.

In order to account for the brightness changes in the image, a method called [Otsu][otsu_wiki] is employed which operates on the histogram of the source image and tries to separate the foreground from the background. The image below is produced by exactly this method.

![Binary Image][binary_image]

The separation of the barcode from the background works fairly well, resulting in an image which is handed over to the next stage.

### Slicing the image into a grid
The binary image as a whole does not provide much information about its content. In order to make sense of the contained structure, the image is breaken down into smaller chunks which are then described independently from each other. This _description_ is then compared with our hypotheses and either taken into consideration for further processing, or discarded.

During the development, a grid of 20 x 15 cells (assuming a 4:3 aspect ratio of the image) yielded to statisfactory results. 

IMG

Having the image sliced up into individual parts, each cell in the grid needs to be evaluated and classified based on the properties described above. Each cell has to be checked if it contains nothing but parallel lines to get passed on to the next stage.

First, the bars have to be normalized in width (1px width), then separated line by line, followed by the estimation of the angle of each line. Then, each line in the cell is compared to the others to determine the parallelity. Finally, if the majority of lines are parallel to each other, the average angle is computed.

### Extract skeleton of each cell
The normalization of the width to 1px is done by a method known as [skeletonizing][skeleton_wiki]. What it does is, that it tries to remove as much of the weight of the bar as possible. In this implementation, this is simply done by eroding and dilating the contents as long as there are unprocessed pixels. This yields to a _skeleton_ of the given image as shown in the next image:

![skeleton_image][skeleton_image]

This clearly shows the location of the barcode, and the bars of the code reduced to their minimum width of 1px.

### Component Labeling
In order to find out if parallel lines are contained within each cell, the skeletonized content, which ideally contains straight lines of the interested area, must be separated into individual pieces (lines). This is achieved by applying a technique called [connected-component labeling][labeling_wiki] which separates a given region into its individual components. In case of the barcode pattern, all lines within the cell are split up into single lines and then weighted by their rotation.

Due to the fact that component labeling is usually quite expensive in terms of computation, a fast algorithm was of the essence to create a real-time application. With that in mind, an implementation of the paper ["A Linear-Time Component-Labeling Algorithm Using Contour Tracing Technique"][labeling_paper] by Fu Chang, Chun-Jen Chen, and Chi-Jen Lu was found on [CodeProject][labeling_codeproject]. Unfortunatelly, the original code was written in C and had to be ported to JavaScript.

The image below visualizes the output of the component-labeling stage.

![component_labeling_image][component_labeling_image]

As mentioned before, each cell is treated invividually, that's why each color is used repeatedly throughout the cells. The color for each component within the cell is unique and denotes the label given by the algorithm. The following images show scaled up versions of two extracted cells, of which the left one indicates a possible barcode area whereas the right one does not contain much but noise.

![Component labeling lines][component_labeling_lines_image]
![Component labeling lines][component_labeling_text_image]

Each label can then be considered as a possible __bar__ of a barcode pattern. To be able to classify such a representation, a quantitative value needs to be computed for each __bar__ which can then be compared with the other components. 

### Determining the orientation of such a component
The orientation of a single component within a cell is calculated by using [central image moments][central_image_moments_wiki]. This method is typically used to extract information of the orientation of a binary image. In this case, the binary image is represented by the labeled components. Each component is considered its own binary image of which the central image moment can be computed. 

As depicted in the equation below, the orientation (indicated as &theta;) of a binary image can be determined by knowing its central moments (&mu;). 

![Calculation of Theta][math_theta]

The central moments (&mu;) are computed by making use of the raw moments (M) and the centroid (x,y)  which in turn need to be calculated up front.

![Calculation of mu][math_mu]

The following computes the components of the centroid (x,y) by using the raw moments (M).

![Calculating x bar][math_x_y_bar]

Since we need image moments up to the second order, the following listing shows the computation of each single moment. The sum over x and y denotes an iteration over the entire image, whereas  I(x,y) indicates the value of the pixel at the position x,y. In this case, the value can either be 0 or 1, since we are operating on a binary image.

![Calculating M][math_m]

After this step, each component has an angle assigned which is then used in the first step of the classification.

### Determining cell quality

#### Discarding non-representative information
Cells containing none, or just one component are immediatelly discarded and not used for further processing. In addition, components which do not cover at least 6 px (M00) are exlucded from any subsequent calculations of the affected cell. This pre-filtered list serves as basis for determining the uniformity of the component's angles throughout a single cell.

In case of a barcode each component in a cell should be ideally parallel to each other. But due to noise, distortion and other influences, this may vary at some degree. A simple clustering technique is applied to find out the similarity of such components. First off, all angles are clustered with a certain threshold, whereupon the cluster with the highest count of members is selected. Only if this cluster's member-size is greater that 3/4 th of the initial set (without the non-representative components) this cell is finally considered as being part of a barcode pattern. From now on, this cell is referred to as a patch, which contains the following information:

- an index (unique identifier within the grid)
- the bounding box defining the cell
- all components and their associated moments
- an average angle (computed from the cluster)
- a vector pointing in the direction of orientation

The following picture highlights the patches (cells) which were found during the classification process described above.

![Image found patches][found_patches_image]

It's noticable that some cells were falsely classified as being part of a barcode pattern. Those false positives can be taken care of by finding connected areas (consisting of more than one cell) and discarding all remaining cells.

### Finding connected cells
Basically, cells can be considered part of a barcode if they are neighbors and share common properties. This grouping is archived by a simple recursive component-labeling algorithm which operates on similarity of orientation, instead of color. For a patch to become member of a label, its vector must point in the same direction as its neighbor's. In order to account for deviations caused by distortion and other geometric influences, the orientation can deviate up to 5 %. The next image illustrates those connected cells where the color defines a certain group.  

![Connected patch labels][connected_patch_labels]

Sometimes even neighboring cells are colored differently. This happens if the orientation of those patches differ too much (> 5%).

### Selecting groups
Next up is the selection of the groups which most probably contain a barcode. Because more than one barcode can be present in an image at the same time, groups are first sorted and then filtered by their count of patches.

![Remaining patch labels][remaining_patch_labels]

Only the biggest groups remain which are then passed on to the creation of a bounding-box.

### Create bounding box
Finally all the information necessary for outlining the location of the barcode is available. In this last step, a minimum bounding box is created
which spans over all the patches in one group. First, the average angle of the containing patches is calculated which is then used to rotate the cells
by exactly this angle. After that a bounding-box is computed by simply finding the outermost corners of all the patches.

![Rotated cells with box][transformed_patches]

Finally, the bounding-box is rotated in the inverse direction to transform it back to its origin.

![Bounding box][bounding_box_skeleton]

As illustrated in the image above, the bounding-box is placed exactly where the barcode pattern is printed. Having a box like this helps a lot during the
actual decoding process because knowing the orientation and the rough area limits the scanning efforts.

## Barcode Decoder




[teaser_image]: http://barcode.oberhofer.us/doc/img/teaser.png
[binary_image]: http://barcode.oberhofer.us/doc/img/binary.png
[skeleton_image]: http://barcode.oberhofer.us/doc/img/skeleton.png
[otsu_wiki]: http://en.wikipedia.org/wiki/Otsu%27s_method
[douglas_05]: http://www.icics.org/2005/download/P0840.pdf
[skeleton_wiki]: http://en.wikipedia.org/wiki/Morphological_skeleton
[labeling_wiki]: http://en.wikipedia.org/wiki/Connected-component_labeling
[labeling_codeproject]: http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
[labeling_paper]: http://www.iis.sinica.edu.tw/papers/fchang/1362-F.pdf
[component_labeling_image]: http://barcode.oberhofer.us/doc/img/component-labeling.png
[component_labeling_lines_image]: http://barcode.oberhofer.us/doc/img/component-labeling-line.png
[component_labeling_text_image]: http://barcode.oberhofer.us/doc/img/component-labeling-text.png
[math_theta]: http://www.sciweavers.org/tex2img.php?eq=%5CTheta%20%3D%20%5Cfrac%7B1%7D%7B2%7D%20%5Carctan%20%5Cleft%28%20%5Cfrac%7B2%5Cmu%27_%7B11%7D%7D%7B%5Cmu%27_%7B20%7D%20-%20%5Cmu%27_%7B02%7D%7D%20%5Cright%29&bc=Transparent&fc=Black&im=png&fs=12&ff=arev&edit=0
[math_mu]: http://www.sciweavers.org/tex2img.php?eq=%5Cmu%27_%7B11%7D%20%3D%20M_%7B11%7D%2FM_%7B00%7D%20-%20%5Cbar%7Bx%7D%5Cbar%7By%7D%20%5C%5C%0A%5Cmu%27_%7B02%7D%20%3D%20M_%7B02%7D%2FM_%7B00%7D%20-%20%5Cbar%7By%7D%5E2%20%5C%5C%0A%5Cmu%27_%7B20%7D%20%3D%20M_%7B20%7D%2FM_%7B00%7D%20-%20%5Cbar%7Bx%7D%5E2&bc=Transparent&fc=Black&im=png&fs=12&ff=arev&edit=0
[math_x_y_bar]: http://www.sciweavers.org/tex2img.php?eq=%5Cbar%7Bx%7D%20%3D%20M_%7B10%7D%2FM_%7B00%7D%20%5C%5C%0A%5Cbar%7By%7D%20%3D%20M_%7B01%7D%2FM_%7B00%7D&bc=Transparent&fc=Black&im=png&fs=12&ff=arev&edit=0
[math_m]: http://www.sciweavers.org/tex2img.php?eq=M_%7B00%7D%20%3D%20%5Csum_x%20%5Csum_y%20I%28x%2Cy%29%20%5C%5C%0AM_%7B10%7D%20%3D%20%5Csum_x%20%5Csum_y%20x%20I%28x%2Cy%29%20%5C%5C%0AM_%7B01%7D%20%3D%20%5Csum_x%20%5Csum_y%20y%20I%28x%2Cy%29%20%5C%5C%0AM_%7B11%7D%20%3D%20%5Csum_x%20%5Csum_y%20xy%20I%28x%2Cy%29%20%5C%5C%0AM_%7B20%7D%20%3D%20%5Csum_x%20%5Csum_y%20x%5E2%20I%28x%2Cy%29%20%5C%5C%0AM_%7B02%7D%20%3D%20%5Csum_x%20%5Csum_y%20y%5E2%20I%28x%2Cy%29&bc=Transparent&fc=Black&im=png&fs=12&ff=arev&edit=0
[central_image_moments_wiki]: http://en.wikipedia.org/wiki/Image_moment#Central_moments
[found_patches_image]: http://barcode.oberhofer.us/doc/img/patches_found.png
[connected_patch_labels]: http://barcode.oberhofer.us/doc/img/connected-patch-labels.png
[remaining_patch_labels]: http://barcode.oberhofer.us/doc/img/remaining-patch-labels.png
[transformed_patches]: http://barcode.oberhofer.us/doc/img/bb-rotated.png
[bounding_box_skeleton]: http://barcode.oberhofer.us/doc/img/bb-binary.png