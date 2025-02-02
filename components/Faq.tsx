/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function Faq() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-6 md:py-20 mobile:pt-20 ">
      <div className="flex flex-col  space-y-4 ">
        <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
          Common <span className="text-[#F45501]">Questions</span>
          <div className="h-1 w-[200px] bg-gradient-to-r from-[#F45501] to-transparent"></div>
        </h2>
      </div>

      <div className="mx-auto max-w-7xl mt-8 md:mt-12">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="border border-[#F45501] border-opacity-50 rounded-lg px-4 bg-white/5 backdrop-blur-sm"
          >
            <AccordionTrigger className="text-white hover:text-[#FF6B00] transition-colors">
              How accurate are your predictions?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Our AI model has achieved a consistent accuracy rate above 75%
              over the past 3+ years. We process millions of data points,
              including historical performance, team dynamics, and real-time
              market movements to deliver highly accurate predictions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border border-[#F45501] border-opacity-50 rounded-lg px-4 bg-white/5 backdrop-blur-sm"
          >
            <AccordionTrigger className="text-white hover:text-[#FF6B00]  transition-colors duration-200">
              Which leagues do you cover?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              We cover all major global leagues including Premier League, La
              Liga, Bundesliga, Serie A, Ligue 1, and many more. Our system
              analyzes matches from over 50 leagues worldwide to provide
              comprehensive coverage.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border border-[#F45501] border-opacity-50 rounded-lg px-4 bg-white/5 backdrop-blur-sm"
          >
            <AccordionTrigger className="text-white hover:text-[#FF6B00] transition-colors duration-200 ">
              How far in advance are predictions available?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Our predictions are typically available 48 hours before match
              kickoff, giving you ample time to analyze and make informed
              decisions. We continuously update our predictions based on the
              latest data and market movements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border border-[#F45501] border-opacity-50 rounded-lg px-4 bg-white/5 backdrop-blur-sm"
          >
            <AccordionTrigger className="text-white hover:text-[#FF6B00]  transition-colors duration-200">
              What's included in the free trial?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Our 3-day free trial gives you full access to all features,
              including predictions, market analysis, and historical data. No
              credit card is required to start your trial, and you can cancel
              anytime.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="border border-[#F45501] border-opacity-50 rounded-lg px-4 bg-white/5 backdrop-blur-sm"
          >
            <AccordionTrigger className="text-white hover:text-[#FF6B00]  transition-colors duration-200">
              How does your AI model work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Our deep learning model combines neural networks with advanced
              statistical analysis to process vast amounts of data. We analyze
              team performance, player statistics, historical matches, market
              odds, and numerous other factors to generate accurate predictions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
