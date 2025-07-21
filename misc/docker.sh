#!/bin/bash

# Aquiline Website Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Start the website
start() {
    print_status "Starting Aquiline website..."
    check_docker
    
    if docker-compose ps | grep -q "aquiline-website.*Up"; then
        print_warning "Website is already running at http://localhost:3000"
    else
        docker-compose up --build -d
        print_success "Website started successfully!"
        print_status "Access your website at: http://localhost:3000"
    fi
}

# Stop the website
stop() {
    print_status "Stopping Aquiline website..."
    check_docker
    
    if docker-compose ps | grep -q "aquiline-website.*Up"; then
        docker-compose down
        print_success "Website stopped successfully!"
    else
        print_warning "Website is not currently running."
    fi
}

# Restart the website
restart() {
    print_status "Restarting Aquiline website..."
    stop
    sleep 2
    start
}

# View logs
logs() {
    print_status "Showing website logs..."
    check_docker
    docker-compose logs -f
}

# Check status
status() {
    check_docker
    print_status "Checking website status..."
    
    if docker-compose ps | grep -q "aquiline-website.*Up"; then
        print_success "Website is running at http://localhost:3000"
        docker-compose ps
    else
        print_warning "Website is not currently running."
    fi
}

# Clean up Docker resources
clean() {
    print_status "Cleaning up Docker resources..."
    check_docker
    
    # Stop and remove containers
    docker-compose down --remove-orphans
    
    # Remove unused images
    docker image prune -f
    
    print_success "Cleanup completed!"
}

# Show help
help() {
    echo "Aquiline Website Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start    Start the website (http://localhost:3000)"
    echo "  stop     Stop the website"
    echo "  restart  Restart the website"
    echo "  status   Check if the website is running"
    echo "  logs     Show website logs"
    echo "  clean    Clean up Docker resources"
    echo "  help     Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start     # Start the website"
    echo "  $0 logs      # View real-time logs"
    echo "  $0 status    # Check if running"
}

# Main script logic
case "${1:-}" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    logs)
        logs
        ;;
    clean)
        clean
        ;;
    help|--help|-h)
        help
        ;;
    "")
        print_error "No command specified."
        echo ""
        help
        exit 1
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        help
        exit 1
        ;;
esac
