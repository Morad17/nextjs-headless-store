import React from "react";
import "./homepage.scss";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="banner">
        <div className="banner-text">
          <h2 className="banner-title">Game With Style</h2>
          <p className="banner-caption">
            Create your own Pc and elevate your Gaming Experience now
          </p>
          <Link className="banner-btn" href="/build-pc">
            Get Started
          </Link>
        </div>
        <Image
          className="banner-image"
          src="/assets/images/gaming-pc.png"
          alt="Pc"
          width={300}
          height={200}
        />
      </div>
      <div className="homepage-info">
        <div className=" card card-1">
          <Image src="/assets/gif/cpu.gif" alt="Pc" width={300} height={200} />
          <div className="card-info">
            <h3 className="card-title">Aesthetic Builds</h3>
            <p className="card-text">
              Choose the style thats right for you, from our large list of
              aesthetic cases.
            </p>
          </div>
        </div>
        <div className=" card card-2">
          <Image
            src="/assets/gif/graphic-card.gif"
            alt="Pc"
            width={300}
            height={200}
          />
          <div className="card-info">
            <h3 className="card-title">Optimum Components</h3>
            <p className="card-text">
              Hand pick from our selection of components, with full specs of
              each component on display.
            </p>
          </div>
        </div>
        <div className="card card-3">
          <Image src="/assets/gif/buy.gif" alt="Pc" width={300} height={200} />
          <div className="card-info">
            <h3 className="card-title">Buy With Confidence</h3>
            <p className="card-text">
              Prices are displayed at each step of the build process, so total
              costs are fully transparent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
