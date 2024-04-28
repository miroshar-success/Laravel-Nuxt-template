<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-4">Product Details</h5>
            <div class="row">
              <div class="text-center col-xl-5 col-lg-6">
                <img
                  class="mx-auto shadow-lg w-100 border-radius-lg"
                  src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb.jpg"
                  alt="chair"
                />
                <div
                  class="my-gallery d-flex mt-4 pt-2"
                  itemscope
                  itemtype="http://schema.org/ImageGallery"
                >
                  <figure
                    class="ms-2 me-3"
                    itemprop="associatedMedia"
                    itemscope
                    itemtype="http://schema.org/ImageObject"
                  >
                    <a
                      href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-1.jpg"
                      itemprop="contentUrl"
                      data-size="500x600"
                    >
                      <img
                        class="w-100 min-height-100 max-height-100 border-radius-lg shadow"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-1.jpg"
                        alt="Image description"
                      />
                    </a>
                  </figure>
                  <figure
                    class="me-3"
                    itemprop="associatedMedia"
                    itemscope
                    itemtype="http://schema.org/ImageObject"
                  >
                    <a
                      href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-2.jpg"
                      itemprop="contentUrl"
                      data-size="500x600"
                    >
                      <img
                        class="w-100 min-height-100 max-height-100 border-radius-lg shadow"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-2.jpg"
                        itemprop="thumbnail"
                        alt="Image description"
                      />
                    </a>
                  </figure>
                  <figure
                    class="me-3"
                    itemprop="associatedMedia"
                    itemscope
                    itemtype="http://schema.org/ImageObject"
                  >
                    <a
                      href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-3.jpg"
                      itemprop="contentUrl"
                      data-size="500x600"
                    >
                      <img
                        class="w-100 min-height-100 max-height-100 border-radius-lg shadow"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-3.jpg"
                        itemprop="thumbnail"
                        alt="Image description"
                      />
                    </a>
                  </figure>
                  <figure
                    class="me-3"
                    itemprop="associatedMedia"
                    itemscope
                    itemtype="http://schema.org/ImageObject"
                  >
                    <a
                      href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-4.jpg"
                      itemprop="contentUrl"
                      data-size="500x600"
                    >
                      <img
                        class="w-100 min-height-100 max-height-100 border-radius-lg shadow"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-4.jpg"
                        itemprop="thumbnail"
                        alt="Image description"
                      />
                    </a>
                  </figure>
                  <figure
                    itemprop="associatedMedia"
                    itemscope
                    itemtype="http://schema.org/ImageObject"
                  >
                    <a
                      href="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-5.jpg"
                      itemprop="contentUrl"
                      data-size="500x600"
                    >
                      <img
                        class="w-100 min-height-100 max-height-100 border-radius-lg shadow"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/product-thumb-5.jpg"
                        itemprop="thumbnail"
                        alt="Image description"
                      />
                    </a>
                  </figure>
                </div>
                <!-- Root element of PhotoSwipe. Must have class pswp. -->
                <div
                  class="pswp"
                  tabindex="-1"
                  role="dialog"
                  aria-hidden="true"
                >
                  <!-- Background of PhotoSwipe.
                    It's a separate element, as animating opacity is faster than rgba().-->
                  <div class="pswp__bg"></div>
                  <!-- Slides wrapper with overflow:hidden. -->
                  <div class="pswp__scroll-wrap">
                    <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
                    <!-- don't modify these 3 pswp__item elements, data is added later on. -->
                    <div class="pswp__container">
                      <div class="pswp__item"></div>
                      <div class="pswp__item"></div>
                      <div class="pswp__item"></div>
                    </div>
                    <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                    <div class="pswp__ui pswp__ui--hidden">
                      <div class="pswp__top-bar">
                        <!--  Controls are self-explanatory. Order can be changed. -->
                        <div class="pswp__counter"></div>
                        <button
                          class="me-2 btn btn-white btn-sm pswp__button pswp__button--close"
                        >
                          Close (Esc)
                        </button>
                        <button
                          class="me-2 btn btn-white btn-sm pswp__button pswp__button--fs"
                        >
                          Fullscreen
                        </button>
                        <button
                          class="me-2 btn btn-white btn-sm pswp__button pswp__button--arrow--left"
                        >
                          Prev
                        </button>
                        <button
                          class="btn btn-white btn-sm pswp__button pswp__button--arrow--right"
                        >
                          Next
                        </button>
                        <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                        <!-- element will get class pswp__preloader--active when preloader is running -->
                        <div class="pswp__preloader">
                          <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                              <div class="pswp__preloader__donut"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
                      >
                        <div class="pswp__share-tooltip"></div>
                      </div>
                      <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mx-auto col-lg-5">
                <h3 class="mt-4 mt-lg-0">Apple Bundle</h3>
                <div class="rating">
                  <i class="fas fa-star" aria-hidden="true"></i>
                  <i class="fas fa-star" aria-hidden="true"></i>
                  <i class="fas fa-star" aria-hidden="true"></i>
                  <i class="fas fa-star" aria-hidden="true"></i>
                  <i class="fas fa-star-half-alt" aria-hidden="true"></i>
                </div>
                <br />
                <h6 class="mt-3 mb-0">Price</h6>
                <h5>$1,419</h5>
                <span class="badge badge-success">In Stock</span>
                <br />
                <label class="mt-4">Description</label>
                <ul>
                  <li>
                    The most beautiful curves of this swivel stool adds an
                    elegant touch to any environment
                  </li>
                  <li>Memory swivel seat returns to original seat position</li>
                  <li>
                    Comfortable integrated layered chair seat cushion design
                  </li>
                  <li>Fully assembled! No assembly required</li>
                </ul>
                <div class="mt-4 row">
                  <div class="mt-2 col-lg-5 mt-lg-0">
                    <label>Frame Material</label>
                    <select
                      id="choices-material"
                      class="form-control"
                      name="choices-material"
                    >
                      <option value="Choice 1" selected>Wood</option>
                      <option value="Choice 2">Steel</option>
                      <option value="Choice 3">Aluminium</option>
                      <option value="Choice 4">Carbon</option>
                    </select>
                  </div>
                  <div class="mt-2 col-lg-5 mt-lg-0">
                    <label>Color</label>
                    <select
                      id="choices-colors"
                      class="form-control"
                      name="choices-colors"
                    >
                      <option value="Choice 1" selected>White</option>
                      <option value="Choice 2">Gray</option>
                      <option value="Choice 3">Black</option>
                      <option value="Choice 4">Blue</option>
                      <option value="Choice 5">Red</option>
                      <option value="Choice 6">Pink</option>
                    </select>
                  </div>
                  <div class="col-lg-2">
                    <label>Quantity</label>
                    <select
                      id="choices-quantity"
                      class="form-control"
                      name="choices-quantity"
                    >
                      <option value="Choice 1" selected>1</option>
                      <option value="Choice 2">2</option>
                      <option value="Choice 3">3</option>
                      <option value="Choice 4">4</option>
                      <option value="Choice 5">5</option>
                      <option value="Choice 6">6</option>
                      <option value="Choice 7">7</option>
                      <option value="Choice 8">8</option>
                      <option value="Choice 9">9</option>
                      <option value="Choice 10">10</option>
                    </select>
                  </div>
                </div>
                <div class="mt-4 row">
                  <div class="col-lg-5">
                    <button
                      class="mb-0 btn bg-gradient-success mt-lg-auto w-100"
                      type="button"
                      name="button"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 row">
              <other-products />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// eslint-disable-next-line import/no-named-as-default
import Choices from "choices.js";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import OtherProducts from "~~/pagesComponents/ecommerce/productPage/OtherProducts.vue";
import "photoswipe/style.css";

definePageMeta({
    middleware: ["auth"],
})

onMounted(() => {
  getChoices("choices-quantity");
  getChoices("choices-material");
  getChoices("choices-colors");

  const lightbox = new PhotoSwipeLightbox({
    gallery: ".my-gallery",
    children: "figure",
    pswpModule: () => import("photoswipe"),
  });
  lightbox.init();
});

const getChoices = (id) => {
  const element = document.getElementById(id);
  if (element) {
    return new Choices(element, {
      searchEnabled: false,
    });
  }
};
</script>
