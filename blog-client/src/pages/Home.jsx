import React from 'react';
import HeroSection from './Home/HeroSection';
import RecentBlogs from './Home/RecentBlogs';
import NewsletterSection from './Home/NewsletterSection';
import TipsAndReadersCorner from './Home/TipsAndReadersCorner';
import TrendingTopics from './Home/TrendingTopics';

const Home = () => {
    return (
        <div>
           <HeroSection></HeroSection> 
           <RecentBlogs></RecentBlogs>
        
           <TrendingTopics></TrendingTopics>
           <TipsAndReadersCorner></TipsAndReadersCorner>
           <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;