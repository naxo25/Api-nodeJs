const express = require('express');
const router = express.Router();

const pool = require('../database');
//const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, url } = req.body;
    const newLink = {
        title,
        url
    };
    await pool.query('INSERT INTO nodejs set ?', [newLink]);
    //req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM nodejs'); //WHERE user_id = ?', [req.user.id]
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM nodejs WHERE ID = ?', [id]);
    //req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM nodejs WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url} = req.body; 
    const newLink = {
        title,        
        url
    };
    await pool.query('UPDATE nodejs set ? WHERE id = ?', [newLink, id]);
    //req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

module.exports = router;