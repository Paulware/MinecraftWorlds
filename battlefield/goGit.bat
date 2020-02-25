copy C:\SpigotMC\scriptcraft\plugins\battlefield.js
copy C:\SpigotMC\scriptcraft\plugins\m1Garand.js
copy C:\SpigotMC\scriptcraft\plugins\xml\battlefield.xml
copy C:\SpigotMC\scriptcraft\plugins\xml\m1Garand.xml
rem copy C:\SpigotMC\spigot.yml
rem copy C:\SpigotMC\bukkit.yml
cd ..
git add .
git commit -am "comment"
git push origin master
pause