const express = require('express');
const { Builder, By } = require('selenium-webdriver');  // importing required libraries
 
const app = express();
const port = 3000;
app.get('/', async (req, res) => {
 try {
   const data = await WebScrapFunct();
   res.status(200).json(data);
 } catch (error) {
   res.status(500).json({
     message: 'Server error occurred',
   });
 }
});

//express server started for listening requests on 127.0.0.1:3000
app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`);
});   
 
//Function for scrapping details - Title Views Published Date
async function WebScrapFunct() {
 try {
      driver = await new Builder().forBrowser('chrome').build();
//    await driver.get('https://www.youtube.com/c/WebDevSimplified/videos');
    await driver.get('https://www.youtube.com/c/IndianHairBeauty/videos');
   const allVideos = await driver.findElements(
     By.css('ytd-grid-video-renderer.style-scope.ytd-grid-renderer')
   );
   return await getVideos(allVideos);
 } catch (error) {
   throw new Error(error);
 } finally {
   await driver.quit();
 }
}
async function getVideos(videos) {  // Function to extract details from HTML collection
    let videoDetails = [];
    try {
      for (const video of videos) {
        const title = await video.findElement(By.id('video-title')).getText();
        const views = await video
          .findElement(By.xpath(".//*[@id='metadata-line']/span[1]"))
          .getText();
        const date = await video
          .findElement(By.xpath(".//*[@id='metadata-line']/span[2]"))
          .getText();
        videoDetails.push({
          title: title ?? '',
          views: views ?? '',
          publishedDate: date ?? '',
        });
      }
    } catch (error) {
      console.log(error);
    }
    return videoDetails;
   }
   