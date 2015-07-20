module.exports = function(app, passport) {
    
    app.use(function(req, res, next){
    
        if(req.user || req.url === '/login' || req.url === '/signup' )
        {
             next();
        }else
        {
            
            res.redirect('/login');
        }


       
    
    });

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    app.get('/', function(req, res) {
        res.redirect('/printermenu');
    });
    


    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.html', { message: req.flash('loginMessage') }); 
    });

    // process the login form
   app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/printermenu', // redirect to the secure printer menu section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

    /////**********For Sign Up**************////////
    
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.html', { message: req.flash('signupMessage') });
    });
    
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login', // redirect to the printer menu section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
        
    
    app.post('/update', passport.authenticate('local-update', {
        successRedirect : '/logout', 
       // failureRedirect : '/signup', 
        failureFlash : true // allow flash messages
    }));
    
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/printermenu', isLoggedIn, function(req, res) {
        res.render('menu.html', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
     app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard.html', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
    
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
