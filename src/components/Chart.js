import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode, isBusinessDay } from "lightweight-charts";

export default function Chart() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      localization: {
        locale: 'en-US',
        dateFormat: 'MM/dd',
        timeFormatter: utcTime => {
          let timestamp = new Date(utcTime * 1000);
          if (isBusinessDay(utcTime))
            return utcTime;
          return timestamp.toLocaleString("en-US", { timeZoneName: "short" });
        },
      },
      timeScale: {
        timeVisible: true,
        visible: true,
        secondsVisible: true,
        borderColor: "#485c7b",
      },
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      watermark: {
        color: '#FFFFFF',
        visible: true,
        text: 'BTCUSDTPERP',
        fontSize: 24,
        horzAlign: 'left',
        vertAlign: 'bottom',
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#485c7b",
        drawTicks: false,
      },
    });

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });

    fetch("../data.json")
      .then((resp) => resp.json())
      .then((data) => {
        candleSeries.setData(data.candles);
        candleSeries.setMarkers(data.orders);
      });
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <>
      <h2>Trade Chart</h2>
      <div ref={chartContainerRef} className="chart-container" />
    </>
  );
}
