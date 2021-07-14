# makina-next
next js app for makina

// MacOs
dependencies for image manuplation
brew install imagemagick --with-webp
brew install graphicsmagick

// Ubuntu
sudo apt-get install graphicsmagick
sudo apt-get install imagemagick
sudo apt-get install webp

// For deploying the Project

git add .
git commit -m "deploy"
git push
cap production deploy

//First Deploy to server
need to copy shared folder
scp -r /shared user@0.0.0.0:/productionFolder


be sure nginx or webserver is listening local host 127.0.0.1:5000
