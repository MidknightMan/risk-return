# Welcome to risk//return

**_DISCLAIMER_**
Please use this at your own risk. No investment decisions should be made solely on the basis of this information. This has been developed as an educational software project, NOT as a financial tool.

This app has been designed to allow a user to understand the risks and rewards of securities when combined in a portfolio.
It draws from multiple different data sources and combines them to create a risk//reward risk score which can be utilised in conjunction with the 1 year return figure to determine whether or not the security looks like a reasonable investment.

# Sources:

- finnhubAPI: sentiment analysis
- alphaVantageAPI: bollinger bands for standard deviation analysis
- iexAPI: company profiles, logos and key stats (including beta)
- tiingoAPI: search securities by string
- worldtradingdataAPI: search securities by ticker symbol

# Installation instructions

In order to run this project, please ensure that you have Node.js installed. Please follow this useful guide if you are having issues with this: https://www.guru99.com/download-install-node-js.html

Once Node.js is installed, please clone and download this project to your chosen directory. Once you are inside the directory, use your CLI to install the dependencies required to run this project by running the command `npm install`. This may take a short amount of time, so feel free to pour yourself a brew.

To launch this project on your localhost, please run the command `npm start`. The default port is 3000.

**_Please note that you will require API keys for all the sources above however all are available for free._**
