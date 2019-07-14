const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Poll = require('./models/Poll');

const uri = 'mongodb+srv://user:pass@makeitreal-uiiha.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true });

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
  const polls = await Poll.find();
  res.render('index', { polls });
});

app.get('/polls/new/', (req, res) => {
  res.render('form');
});

app.get('/polls/:id', async (req, res, next) => {
  try {
  let id = req.params.id;
  await Poll.deleteOne({_id: id});
  res.redirect('/');
  } catch(err) {
    next(err);
  } 
});

app.post('/polls', async (req, res, next) => {
  const data = {
    title: req.body.title, 
    description: req.body.description
  }
  try {
    const poll = new Poll(data);
    await poll.save();
    res.redirect('/');
    } catch(err) {
      return next(err);
    }
});

app.listen(3000, () => console.log('listening on port 3000!'));
