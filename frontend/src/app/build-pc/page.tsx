"use client";

import React, { useEffect, useRef, useState } from "react";
import "./build-pc.scss";
import PcModel from "../../components/pc-model/PcModel";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Products from "@/components/products-list/page";
import { useBuildPcStore } from "@/store/useBuildPcStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AddOnConfirmToast from "@/components/custom-toast/AddOnConfirmToast";
import Image from "next/image";

export default function BuildPc() {
  const {
    categoriesLoading,
    categoriesError,
    selectedCategoryId,
    showMainComponents,
    fetchCategories,
    selectCategory,
    toggleComponentType,
    getRequiredCategories,
    getOptionalCategories,
  } = useBuildPcStore();

  const {
    clearOrder,
    currentOrder,
    getOrderTotal,
    getMainComponents,
    getAddOns,
  } = useOrderStore();

  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const requiredCategories = getRequiredCategories();

  // Get categories to display based on toggle
  const displayedCategories = showMainComponents
    ? getRequiredCategories()
    : getOptionalCategories();

  // Reset Order
  const handleResetOrder = () => {
    if (currentOrder.length === 0) {
      toast.info("Order is already empty!");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to reset your order? This will remove all ${currentOrder.length} items from your order.`
    );

    if (confirmed) {
      clearOrder();
      toast.success("Order has been reset successfully!");
    }
  };

  // check if a category has a main component selected in the order
  const isCategoryInOrder = (categoryName: string) => {
    const mainComponents = getMainComponents();
    return mainComponents.some((item) => item.category === categoryName);
  };

  // check if all main components are selected
  const areAllMainComponentsSelected = () => {
    const mainComponents = getMainComponents();
    const requiredCategoryNames = requiredCategories.map((cat) => cat.name);

    // Check if every required category has at least one main component in the order
    return requiredCategoryNames.every((categoryName) =>
      mainComponents.some((item) => item.category === categoryName)
    );
  };

  // Check if user has any add-on components (using the existing getAddOns method)
  const hasAddOnComponents = () => {
    const addOns = getAddOns();
    return addOns.length > 0;
  };

  // Handle switching to add-ons view
  const handleCheckAddOns = () => {
    toggleComponentType(false); // Switch to add-ons view
    toast.info("Browse through available add-on components below!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  // Handle proceeding to order summary
  const handleProceedToOrder = () => {
    toast.success("Proceeding to order summary...", {
      position: "top-center",
      autoClose: 1000,
    });
    setTimeout(() => {
      router.push("/order-summary");
    }, 1000);
  };

  // Show custom toast for add-ons confirmation
  const showAddOnConfirmToast = () => {
    toast(
      <AddOnConfirmToast
        onCheckAddOns={handleCheckAddOns}
        onProceed={handleProceedToOrder}
        closeToast={() => toast.dismiss()}
      />,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: true,
        draggable: false,
        className: "addon-confirm-toast-wrapper",
      }
    );
  };

  // Handle complete order click - always clickable, shows toast if incomplete
  const handleCompleteOrder = () => {
    if (!areAllMainComponentsSelected()) {
      const missingCategories = requiredCategories
        .filter((cat) => !isCategoryInOrder(cat.name))
        .map((cat) => cat.name);

      toast.warning(
        `Please select components for: ${missingCategories.join(", ")}`,
        {
          autoClose: 5000,
        }
      );
      return;
    }

    // All main components are selected
    if (!hasAddOnComponents()) {
      // No add-ons selected, show confirmation toast
      showAddOnConfirmToast();
    } else {
      // Has add-ons, proceed directly
      handleProceedToOrder();
    }
  };

  const isOrderComplete = areAllMainComponentsSelected();

  // Combined arrow and drag functionality
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag functionality state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  // Check scroll position to enable/disable nav buttons
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Arrow scroll functions
  const scrollLeftArrow = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRightArrow = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);

    // Add visual feedback to the slider
    sliderRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setDraggedCard(null);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedCard(null);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDraggedCard(null);
  };

  // Card-specific drag handlers
  const handleCardMouseDown = (e: React.MouseEvent, cardId: string) => {
    setDraggedCard(cardId);
    handleMouseDown(e);
  };

  const handleCardTouchStart = (e: React.TouchEvent, cardId: string) => {
    setDraggedCard(cardId);
    handleTouchStart(e);
  };

  // Prevent default drag behavior on images
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle card click (only if not dragging)
  const handleCardClick = (categoryId: number) => {
    if (!isDragging) {
      selectCategory(categoryId);
    }
  };

  // Update scroll position on resize
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check initial scroll position
  useEffect(() => {
    checkScrollPosition();
  }, [displayedCategories]);

  return (
    <div className="build-pc-page">
      <div className="build-pc-content">
        <div className="background-wrapper">
          <div className="dark-overlay"></div>
        </div>
        <section className="left-section">
          <div className="build-display">
            <h2 className="build-text">Build Your Gaming Pc</h2>
            <div className="model-pc">
              <Canvas
                camera={{ position: [1, 1, 1] }}
                style={{ width: "100%", height: "100%" }}
              >
                <Environment preset="warehouse" />
                <OrbitControls enableZoom={false} />
                <PcModel />
              </Canvas>
            </div>
          </div>
        </section>
        <section className="right-section">
          <div className="category-order">
            <div className="categories-section">
              <div
                className={`category-type-selector ${
                  !showMainComponents ? "add-ons-active" : ""
                }`}
              >
                <div className="main-components">
                  <a
                    className={`cts-btn ${showMainComponents ? "active" : ""}`}
                    onClick={() => toggleComponentType(true)}
                  >
                    Main Components
                  </a>
                </div>
                <div className="add-on-components">
                  <a
                    className={`cts-btn ${!showMainComponents ? "active" : ""}`}
                    onClick={() => toggleComponentType(false)}
                  >
                    Add ons
                  </a>
                </div>
              </div>

              <div className="all-categories">
                {categoriesLoading && <p>Loading categories...</p>}
                {categoriesError && (
                  <p className="error">Error: {categoriesError}</p>
                )}

                {!categoriesLoading &&
                  !categoriesError &&
                  displayedCategories.length > 0 && (
                    <>
                      {/* Categories Slider with drag functionality */}
                      <div
                        ref={sliderRef}
                        className="categories-slider"
                        onScroll={checkScrollPosition}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{ cursor: isDragging ? "grabbing" : "grab" }}
                      >
                        {displayedCategories.map((cat, key) => {
                          const isSelected = selectedCategoryId === cat.id;
                          const isBeingDragged =
                            draggedCard === cat.id.toString();

                          return (
                            <motion.div
                              key={cat.id}
                              className={`category-card ${
                                isSelected ? "selected" : ""
                              } ${isBeingDragged ? "dragging" : ""}`}
                              onClick={() => handleCardClick(cat.id)}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                handleCardMouseDown(e, cat.id.toString());
                              }}
                              onTouchStart={(e) => {
                                e.stopPropagation();
                                handleCardTouchStart(e, cat.id.toString());
                              }}
                              whileHover={
                                !isDragging
                                  ? {
                                      y: -4,
                                      scale: 1.02,
                                      transition: { duration: 0.2 },
                                    }
                                  : {}
                              }
                              whileTap={!isDragging ? { scale: 0.98 } : {}}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: isBeingDragged ? 1.05 : 1,
                              }}
                              transition={{
                                duration: 0.3,
                                delay: key * 0.05,
                                ease: "easeOut",
                              }}
                              drag={false}
                            >
                              <div className="background-wrapper"></div>
                              <div className="category-card-image-div">
                                <Image
                                  src={`/assets/images/categories/${cat.slug}.png`}
                                  className="category-card-image"
                                  alt={cat.name}
                                  width={160}
                                  height={160}
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/assets/icons/default.png";
                                  }}
                                  draggable={false}
                                />
                              </div>
                              <div className="category-card-name-div">
                                <p className="category-card-name">{cat.name}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </>
                  )}

                {!categoriesLoading &&
                  !categoriesError &&
                  displayedCategories.length === 0 && (
                    <p className="no-categories">
                      No{" "}
                      {showMainComponents
                        ? "main components"
                        : "add-on components"}{" "}
                      available.
                    </p>
                  )}
              </div>
            </div>
          </div>
          <Products />
        </section>
      </div>

      {/* Static progress bar container with only state-change animations */}
      <div className="build-progress">
        <div className="total-cost">
          <h3 className="cost-title">Your Total Build Cost:</h3>
          <motion.p
            key={getOrderTotal()} // Re-animate when total changes
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            £{getOrderTotal().toFixed(2)}
          </motion.p>
        </div>

        <div className="reset-order-button">
          <motion.button
            className={`reset-btn ${
              currentOrder.length === 0 ? "disabled" : ""
            }`}
            onClick={handleResetOrder}
            disabled={currentOrder.length === 0}
            title={
              currentOrder.length === 0
                ? "No items to reset"
                : "Reset all items in order"
            }
            whileHover={currentOrder.length > 0 ? { scale: 1.05, y: -2 } : {}}
            whileTap={currentOrder.length > 0 ? { scale: 0.95 } : {}}
          >
            🗑️ Reset Order
          </motion.button>
        </div>
        <div className="build-progress-bar">
          {requiredCategories.map((cat, key) => {
            const categoryName = cat?.name;
            const isInOrder = isCategoryInOrder(categoryName);

            // Determine chevron type class
            let chevronTypeClass = "";
            if (requiredCategories.length === 1) {
              chevronTypeClass = "single-chevron";
            } else if (key === 0) {
              chevronTypeClass = "first-chevron";
            } else if (key === requiredCategories.length - 1) {
              chevronTypeClass = "last-chevron";
            } else {
              chevronTypeClass = "middle-chevron";
            }

            return (
              <motion.div
                key={cat.id}
                className={`custom-chevron ${chevronTypeClass}`}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="chevron-fill"
                  initial={{ x: "-100%" }}
                  animate={{
                    x: isInOrder ? "0%" : "-100%",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />

                <span className={isInOrder ? "active-text" : "inactive-text"}>
                  {categoryName}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="compete-order">
          <motion.button
            className={`complete-order-btn ${
              isOrderComplete ? "complete" : "incomplete"
            }`}
            onClick={handleCompleteOrder}
            title={
              isOrderComplete
                ? "Complete your order"
                : `Missing ${
                    requiredCategories.length - getMainComponents().length
                  } main components`
            }
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              background: isOrderComplete ? "#68af09" : "#8e9aaf",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.span
              key={isOrderComplete ? "complete" : "incomplete"}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Complete Order
            </motion.span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
