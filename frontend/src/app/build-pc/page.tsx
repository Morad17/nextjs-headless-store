"use client";

import React, { useEffect, useState } from "react";
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
import CategorySlider from "@/components/category-slider/page";
import Loading from "@/components/loading-spinner/page";
import Image from "next/image";
import BuildCarousel from "@/components/build-carousel/page";

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
    preloadAllProducts,
  } = useBuildPcStore();

  const {
    clearOrder,
    currentOrder,
    getOrderTotal,
    getMainComponents,
    getAddOns,
  } = useOrderStore();

  const router = useRouter();

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasAutoSelectedFirstCategory, setHasAutoSelectedFirstCategory] =
    useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsInitialLoad(true);

        await fetchCategories();
        await preloadAllProducts();

        setIsInitialLoad(false);
      } catch (error) {
        console.error("Failed to initialize data:", error);
        setIsInitialLoad(false);
      }
    };

    initializeData();
  }, [fetchCategories, preloadAllProducts]);

  useEffect(() => {
    if (!isInitialLoad && !hasAutoSelectedFirstCategory && !categoriesError) {
      const displayedCategories = showMainComponents
        ? getRequiredCategories()
        : getOptionalCategories();

      if (displayedCategories.length > 0 && !selectedCategoryId) {
        const firstCategory = displayedCategories[0];
        console.log(`🎯 Auto-selecting first category: ${firstCategory.name}`);
        selectCategory(firstCategory.id);
        setHasAutoSelectedFirstCategory(true);
      }
    }
  }, [
    isInitialLoad,
    hasAutoSelectedFirstCategory,
    categoriesError,
    showMainComponents,
    selectedCategoryId,
    selectCategory,
    getRequiredCategories,
    getOptionalCategories,
  ]);

  useEffect(() => {
    setHasAutoSelectedFirstCategory(false);
  }, [showMainComponents]);

  const requiredCategories = getRequiredCategories();

  const displayedCategories = showMainComponents
    ? getRequiredCategories()
    : getOptionalCategories();

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

  const isCategoryInOrder = (categoryName: string) => {
    const mainComponents = getMainComponents();
    return mainComponents.some((item) => item.category === categoryName);
  };

  const areAllMainComponentsSelected = () => {
    const mainComponents = getMainComponents();
    const requiredCategoryNames = requiredCategories.map((cat) => cat.name);

    return requiredCategoryNames.every((categoryName) =>
      mainComponents.some((item) => item.category === categoryName)
    );
  };

  const hasAddOnComponents = () => {
    const addOns = getAddOns();
    return addOns.length > 0;
  };

  const handleCheckAddOns = () => {
    toggleComponentType(false);
    toast.info("Browse through available add-on components below!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleProceedToOrder = () => {
    toast.success("Proceeding to order summary...", {
      position: "top-center",
      autoClose: 1000,
    });
    setTimeout(() => {
      router.push("/order-summary");
    }, 1000);
  };

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

    if (!hasAddOnComponents()) {
      showAddOnConfirmToast();
    } else {
      handleProceedToOrder();
    }
  };

  const isOrderComplete = areAllMainComponentsSelected();

  if (isInitialLoad) {
    return (
      <div className="build-pc-page">
        <div className="build-pc-loading">
          <Loading
            loading={true}
            loadingText="Loading Build PC components..."
            size={60}
          />
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="build-pc-page">
        <div className="build-pc-error">
          <h2>Failed to Load Components</h2>
          <p>Error: {categoriesError}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="build-pc-page">
      <div className="build-pc-content">
        <div className="background-wrapper">
          <div className="dark-overlay"></div>
        </div>
        <section className="left-section">
          <div className="title-row">
            <h2 className="build-text">Build Your Gaming Pc</h2>
          </div>
          <div className="build-display">
            <div className="model-pc">
              <Canvas
                camera={{ position: [1, 1, 1] }}
                style={{ width: "400px", height: "400px" }}
              >
                <Environment preset="warehouse" />
                {/* <OrbitControls enableZoom={false} /> */}
                <PcModel />
              </Canvas>
            </div>
            <div className="build-carousel-div">
              <BuildCarousel />
            </div>
          </div>
          <div className="ai-helper"></div>
        </section>
        <section className="right-section">
          <div className="category-order">
            <div className="categories-section">
              <div className="category-type-toggle">
                <div
                  className={`category-type-selector ${
                    !showMainComponents ? "add-ons-active" : ""
                  }`}
                >
                  <div className="main-components">
                    <a
                      className={`cts-btn ${
                        showMainComponents ? "active" : ""
                      }`}
                      onClick={() => toggleComponentType(true)}
                    >
                      Main Components
                    </a>
                  </div>
                  <div className="add-on-components">
                    <a
                      className={`cts-btn ${
                        !showMainComponents ? "active" : ""
                      }`}
                      onClick={() => toggleComponentType(false)}
                    >
                      Add ons
                    </a>
                  </div>
                </div>
              </div>

              <div className="all-categories">
                {displayedCategories.length > 0 && (
                  <CategorySlider
                    categories={displayedCategories}
                    selectedCategoryId={selectedCategoryId}
                    onCategorySelect={selectCategory}
                  />
                )}

                {displayedCategories.length === 0 && (
                  <div className="no-categories">
                    <p>
                      No{" "}
                      {showMainComponents
                        ? "main components"
                        : "add-on components"}{" "}
                      available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Products />
        </section>
      </div>

      <div className="build-progress">
        <div className="total-cost">
          <h3 className="cost-title">Total Build Cost:</h3>
          <motion.p
            key={getOrderTotal()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            £{getOrderTotal().toFixed(2)}
          </motion.p>
        </div>

        <div className="reset-order-button">
          <button
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
          >
            {/* ✅ Use your SVG with animation */}
            <div className="reset-icon">
              <Image
                src="/assets/icons/rotating-clockwise-circular-arrow-svgrepo-com.svg"
                alt="Reset"
                width={17}
                height={17}
                className="circle-arrow-icon"
              />
            </div>
            RESET ORDER
          </button>
        </div>
        <div className="build-progress-bar">
          {requiredCategories.map((cat, key) => {
            const categoryName = cat?.name;
            const isInOrder = isCategoryInOrder(categoryName);

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
              <div
                key={cat.id}
                className={`custom-chevron ${chevronTypeClass}`}
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
              </div>
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
            animate={{
              background: isOrderComplete ? "#68af09" : "#c0c0c0",
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
