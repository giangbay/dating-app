# Dating App - Deployment Guide

## Ubuntu Server Setup (18.04 LTS or higher)

### Prerequisites
- Ubuntu 18.04 LTS or higher
- Root or sudo access
- Domain name (optional)
- SSL certificate (optional)

### 1. Initial Server Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y build-essential curl wget git nano
```

### 2. Install Node.js

```bash
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install PHP and Apache

```bash
# Install PHP and Apache
sudo apt install -y php php-fpm apache2 libapache2-mod-php php-mysql php-curl php-json

# Enable Apache modules
sudo a2enmod php8.1
sudo a2enmod rewrite

# Restart Apache
sudo systemctl restart apache2
```

### 4. Install MySQL

```bash
# Install MySQL
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Start MySQL
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 5. Install Docker (Optional but Recommended)

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.0.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 6. Clone and Setup Project

```bash
# Create app directory
sudo mkdir -p /var/www/dating-app
cd /var/www/dating-app

# Clone repository
sudo git clone https://github.com/yourusername/dating-app.git .

# Set permissions
sudo chown -R $USER:$USER /var/www/dating-app
```

### 7. Setup Backend (PHP)

```bash
# Navigate to backend directory
cd /var/www/dating-app/backend

# Install Composer
sudo apt install -y composer

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Edit .env file with your credentials
nano .env

# Create uploads directory
mkdir -p public/uploads
chmod 755 public/uploads
```

### 8. Setup Frontend (React)

```bash
# Navigate to frontend directory
cd /var/www/dating-app/frontend

# Install dependencies
npm install

# Build production version
npm run build

# The build files are in the 'build' directory
```

### 9. Setup Chat Server (Node.js)

```bash
# Navigate to chat server directory
cd /var/www/dating-app/chat-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
nano .env
```

### 10. Configure Apache Virtual Hosts

```bash
# Create virtual host file
sudo nano /etc/apache2/sites-available/dating-app.conf
```

Add the following content:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/dating-app/backend/public

    <Directory /var/www/dating-app/backend/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/dating-app-error.log
    CustomLog ${APACHE_LOG_DIR}/dating-app-access.log combined
</VirtualHost>
```

Enable the site:

```bash
sudo a2ensite dating-app.conf
sudo apache2ctl configtest
sudo systemctl restart apache2
```

### 11. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-apache

# Get certificate
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 12. Setup Systemd Services

#### Chat Server Service

```bash
# Create service file
sudo nano /etc/systemd/system/dating-app-chat.service
```

Add:

```ini
[Unit]
Description=Dating App Chat Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/dating-app/chat-server
ExecStart=/usr/bin/node src/server.js
Restart=always
RestartSec=10
Environment="NODE_ENV=production"

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable dating-app-chat.service
sudo systemctl start dating-app-chat.service
```

### 13. Setup Nginx Reverse Proxy (Optional)

```bash
# Install Nginx
sudo apt install -y nginx

# Configure as reverse proxy
sudo nano /etc/nginx/sites-available/dating-app
```

Add configuration for proxying to Node.js chat server and React frontend.

### 14. Database Setup

```bash
# Create database
mysql -u root -p < /var/www/dating-app/database/schema.sql

# Create database user
mysql -u root -p
```

```sql
CREATE USER 'dating_user'@'localhost' IDENTIFIED BY 'dating_password';
GRANT ALL PRIVILEGES ON dating_app.* TO 'dating_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 15. Setup Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow custom ports if needed
sudo ufw allow 3000/tcp  # Chat server
sudo ufw allow 8000/tcp  # Backend API
```

### 16. Monitoring and Logs

```bash
# View chat server logs
sudo journalctl -u dating-app-chat.service -f

# View Apache logs
sudo tail -f /var/log/apache2/dating-app-error.log

# View MySQL logs
sudo tail -f /var/log/mysql/error.log
```

### 17. Backup Strategy

```bash
# Backup database daily
0 2 * * * mysqldump -u dating_user -p dating_password dating_app | gzip > /backups/dating_app_$(date +\%Y\%m\%d).sql.gz

# Backup application files
0 3 * * * tar -czf /backups/dating_app_files_$(date +\%Y\%m\%d).tar.gz /var/www/dating-app
```

### 18. Performance Optimization

#### Enable Caching

```bash
# Install Redis (optional)
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

#### Configure PHP-FPM

```bash
# Edit PHP-FPM config
sudo nano /etc/php/8.1/fpm/pool.d/www.conf

# Adjust:
# pm.max_children = 50
# pm.start_servers = 10
# pm.min_spare_servers = 5
# pm.max_spare_servers = 15

sudo systemctl restart php8.1-fpm
```

### 19. Troubleshooting

```bash
# Check service status
sudo systemctl status dating-app-chat.service
sudo systemctl status apache2
sudo systemctl status mysql

# Restart services
sudo systemctl restart dating-app-chat.service
sudo systemctl restart apache2
sudo systemctl restart mysql

# Check ports
sudo netstat -tlnp | grep LISTEN
```

## Production Deployment Checklist

- [ ] Update all `.env` files with production credentials
- [ ] Enable HTTPS/SSL
- [ ] Configure proper database backups
- [ ] Set up monitoring and alerting
- [ ] Configure email notifications
- [ ] Test payment processing (if applicable)
- [ ] Set up CI/CD pipeline
- [ ] Configure rate limiting
- [ ] Enable security headers
- [ ] Set up log aggregation
- [ ] Configure database replication (for high availability)
- [ ] Test disaster recovery procedures

---

For more help, visit the [Dating App GitHub Repository](https://github.com/giangbay/dating-app)
