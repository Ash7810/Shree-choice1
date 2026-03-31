@echo off
git init
git add .
set /p msg="Enter commit message: "
git commit -m "%msg%"
set /p repo="https://github.com/Ash7810/Shree-choice1.git"
git remote add origin %repo%
git branch -M main
git push -u origin main
pause