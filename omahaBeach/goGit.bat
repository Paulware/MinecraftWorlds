copy C:\SpigotMC\scriptcraft\plugins\startGame.js
copy C:\SpigotMC\scriptcraft\plugins\omahaRules.js
copy C:\SpigotMC\scriptcraft\plugins\xml\omahaStart.xml
copy C:\SpigotMC\scriptcraft\plugins\xml\omahaRules.xml
copy C:\SpigotMC\spigot.yml
copy C:\SpigotMC\bukkit.yml
copy C:\SpigotMC\server.properties
cd ..
git add .
git commit -am "comment"
git push origin master
pause