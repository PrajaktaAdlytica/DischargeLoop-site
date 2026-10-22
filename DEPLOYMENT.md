# DischargeLoop Hostinger deployment

Built from main commit `d56e917fc1a8adad760006966b7cef3c442bc63b`.

Connect `PrajaktaAdlytica/DischargeLoop-site`, branch `hostinger-deploy`, to the DischargeLoop custom PHP/HTML website's `public_html` directory. These files are prebuilt; no npm install, server command or build step is needed on Hostinger. The included .htaccess preserves direct page links.

The source remains on main. For updates, build main with npm run build, replace this branch's website files with the contents of dist/client, preserve .htaccess, commit and push this deployment branch. Hostinger auto-deployment must be enabled to pick up that push. Pushing source changes to main alone does not rebuild this branch.

Forms and sign-in remain frontend previews.
