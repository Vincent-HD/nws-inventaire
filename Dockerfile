ARG VARIANT=16
FROM node:16

ARG UID=1000
ARG GID=1000

WORKDIR /app

RUN apt-get update -y \
    && DEBIAN_FRONTEND=noninteractive \
    && apt-get install --no-install-recommends -y sudo git \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user to use if preferred - see https://aka.ms/vscode-remote/containers/non-root-user.
RUN groupmod --gid $GID node \
    && usermod --uid $UID --gid $GID node \
    # [Optional] Add sudo support for the non-root user
    && echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

USER $USERNAME

EXPOSE 3000

CMD [ "/bin/sh", "-c", "npm i && npm run dev -- --host 0.0.0.0" ]