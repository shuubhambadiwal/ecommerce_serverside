const express = require('express')
const mongoose = require('mongoose');


mongoose.connect(
    'mongodb+srv://shubhambadiwal2:Wealth@335566@cluster2.josdk.mongodb.net/'
).then(()=>console.log('MongoDB connected')).catch(error => console.log(error));

const app =  express ();
const PORT = process.env.PORT || 5000;