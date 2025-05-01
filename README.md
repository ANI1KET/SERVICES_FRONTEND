Room & Property Marketplace – Microservices-Based Platform

Live Demo: services.aniketrouniyar.com.np

A service-oriented marketplace platform to:

Rent rooms with rich filters and location-aware search

Buy & sell properties (land/houses) with broker/lister tools

Promote listings through short, trackable links with full analytics


Built using a modular microservices architecture, optimized for:

Scalability – Services scale independently, containerized with Docker

Modularity – Feature isolation enables rapid iteration and testing

Reusability & Configurability –

Config-driven form rendering

Typed, reusable UI components

Centralized schema and access control



Core Features

1. Room Rental Engine

Advanced filters: city, location, price, rules, amenities

Query-optimized backend for geo-filtering and performance


2. Property Marketplace

List & discover land/houses

Broker and buyer dashboards with search/filter functionality


3. Saved & Interested Rooms

Save listings

Get real-time alerts for price changes or availability

Powered by Redis + cron-based background service


4. Custom URL Shortener Microservice

Promoters generate short links

Analytics include: IP, device, browser, location, timestamp


5. Role-Based Access Control

Dashboards and permissions for:

Admin

Room Lister

Property Broker



6. Subscriptions & Notifications (WIP)

Paid subscription tiers

Automated alerts for saved searches via email/push


Tech Stack

Frontend

Next.js (App Router) – Routing, layouts, server actions

React + TypeScript – Strongly typed UI

TailwindCSS – Utility-first styling

React Query – Data fetching and caching

React Hook Form – Dynamic and scalable form handling


Backend (Microservices)

GraphQL API Gateway – Apollo Server + Nexus

Background Jobs Service – Node.js + Express + Cron

Shortener Service – Redis-backed microservice for tracking and analytics

Filtering Engine – Optimized multi-criteria room search


Data & Analytics

MongoDB – Flexible document schema

Prisma ORM – Type-safe modeling and migrations

Redis – Queues, caching, pub/sub

Custom Analytics Models – Track user engagement, click-throughs, system metrics


Infrastructure

Docker – Containerized services

PM2 – Node.js process manager inside containers

Nginx – Reverse proxy

CI/CD – GitHub Actions → Docker Registry → Deployed to DigitalOcean Droplet

Live Demo

Try it now: services.aniketrouniyar.com.np


Development Status

[x] Room search & filtering

[x] Property listing workflows

[x] Saved rooms & alert system

[x] Short URL analytics microservice

[ ] Subscriptions + payments

[ ] Push/email notification system

